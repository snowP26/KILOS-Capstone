import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";

const checkTitleDuplicates = async (uploadValue: string) => {
  const { data, error } = await client
    .from("ordinances")
    .select("id")
    .eq("title", uploadValue);

  if (error) {
    console.log("Error checking the duplicates");
    return false;
  }

  return data.length > 0;
};

export const getLocationFromEmail = async (email: string) => {
  const { data, error } = await client
    .from("youth_official")
    .select("location")
    .eq("email", email)
    .single();

  if (error || !data) {
    console.log("Error: ", error || "No data found");
    return null;
  }

  const { data: locationData } = await client
    .from("location")
    .select("name")
    .eq("id", data.location)
    .single();

  return locationData?.name || null;
};

export const postOrdinance = async (
  e: FormEvent<HTMLFormElement>,
  formRef: RefObject<HTMLFormElement>
) => {
  e.preventDefault();

  const formdata = new FormData(e.currentTarget);
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const file = formdata.get("document") as File;

  if (await checkTitleDuplicates(title)) {
    return console.log("There is a duplicate ordinance");
  }

  // Get current user's email
  const { data: sessionData } = await client.auth.getSession();
  const email = sessionData.session?.user.email;
  if (!email) return console.error("No logged-in user found");

  // Get user data
  const { data: userData, error: userDataError } = await client
    .from("youth_official")
    .select("id, location")
    .eq("email", email)
    .single();

  if (userDataError || !userData) {
    console.error("Error retrieving user data:", userDataError);
    return;
  }

  // Insert ordinance
  const { error: insertError } = await client.from("ordinances").insert([
    {
      title,
      description,
      location: userData.location,
      author: userData.id,
      updated_at: new Date().toISOString(),
    },
  ]);

  if (insertError) {
    console.error("Error posting ordinance:", insertError);
    return;
  }

  // Get ordinance ID in one query
  const { data: ordinanceRow } = await client
    .from("ordinances")
    .select("id")
    .eq("title", title)
    .single();

  const ordinanceID = ordinanceRow?.id;
  if (!ordinanceID) return console.error("Ordinance ID not found");

  // Get verbose location once
  const { data: verboseLocation } = await client
    .from("location")
    .select("name")
    .eq("id", userData.location)
    .single();

  if (!verboseLocation) return console.error("Location is not found");

  const fileName = `${verboseLocation.name}_${ordinanceID}_${file.name}`;
  const filepath = `${verboseLocation.name}/${fileName}`;

  // Insert document metadata
  const { error: docError } = await client.from("ordinance_files").insert([
    {
      ordinance_id: ordinanceID,
      file_path: filepath,
      file_name: fileName,
      author: userData.id,
    },
  ]);

  if (docError) {
    return console.error("Error uploading document: ", docError);
  }

  // Upload to storage bucket
  const { error: bucketError } = await client.storage
    .from("ordinances-pending")
    .upload(filepath, file);

  if (bucketError) {
    return console.error("Bucket error: ", bucketError);
  }

  formRef.current?.reset();
};

export const uploadFile = async (ordinance_id: number, doc: File) => {
  const { data: sessionData } = await client.auth.getSession();
  const email = sessionData.session?.user.email;
  if (!email) return console.error("No logged-in user found");

  const locationName = await getLocationFromEmail(email);
  if (!locationName) return console.error("Location not found");

  const { data: userData } = await client
    .from("youth_official")
    .select("id")
    .eq("email", email)
    .single();

  if (!userData) return console.error("User not found");

  const filename = `${locationName}_${ordinance_id}_${doc.name}`;
  const filepath = `${locationName}/${filename}`;

  const { error } = await client.from("ordinance_files").insert([
    {
      ordinance_id,
      file_path: filepath,
      file_name: filename,
      author: userData.id,
    },
  ]);

  if (error) {
    return console.log("Error saving your document: ", error);
  }

  console.log("Success uploading your file");
};
