import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";

export const postOrdinance = async (
  e: FormEvent<HTMLFormElement>,
  formRef: RefObject<HTMLFormElement>
) => {
  e.preventDefault();

  const formdata = new FormData(e.currentTarget);
  const title = formdata.get("title") as string;
  const description = formdata.get("description") as string;
  const file = formdata.get("document") as File;

  console.log(file);

  // Get current user's email
  const { data: sessionData } = await client.auth.getSession();
  const email = sessionData.session?.user.email;
  if (!email) return console.error("No logged-in user found");

  // Get user ID & location
  const { data: userData, error: userDataError } = await client
    .from("youth_official")
    .select("id, location")
    .eq("email", email)
    .single();
  if (userDataError) {
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

  // add initial document
  const thisOrdinance = await client
    .from("ordinances")
    .select("id")
    .eq("title", title)
    .single();
  const ordinanceID = thisOrdinance.data ? thisOrdinance.data.id : null;

  const verboseLocation = (
    await client.from("location").select("name").eq("id", userData.location)
  ).data;

  if (!verboseLocation || verboseLocation.length === 0) {
    return console.error("Location is not found");
  }

  if (!verboseLocation) {
    return console.error("Location is not found");
  }

  const filepath = `${verboseLocation[0].name}/${file.name}`;

  const { error: docError } = await client.from("ordinance_files").insert([
    {
      ordinance_id: ordinanceID,
      file_path: filepath,
      file_name: file.name,
      author: userData.id,
    },
  ]);

  if (docError) {
    return console.error("Error uploading document: ", docError);
  }

  //   const { data: signedUrl, error: signedError } = await client.storage
  //     .from("ordinance-pending")
  //     .createSignedUploadUrl(`${userData.location}/`);

  //   if (signedError) {
  //     return console.error("Error with signing the data: ", signedError);
  //   }

  //   const { error: bucketError } = await client.storage
  //     .from("ordinance-pending")
  //     .uploadToSignedUrl(filepath, signedUrl.token, file, {
  //       contentType: file.type,
  //       upsert: false,
  //     });

  const { error: bucketError } = await client.storage
    .from("ordinances-pending")
    .upload(filepath, file);

  if (bucketError) {
    return console.error("Bucket error: ", bucketError);
  }

  return formRef.current?.reset();
};

export const getLocationFromEmail = async (email: string) => {
  const { data, error } = await client
    .from("youth_official")
    .select("location")
    .eq("email", email)
    .single();
  if (error) {
    return console.log("Error: ", error);
  }
  const location = await client
    .from("location")
    .select("name")
    .eq("id", data.location);

  if (!location.data) {
    return console.log("No data found");
  }

  return location.data[0].name;
};

export const uploadFile = async (ordinance_id: number, doc: File) => {
  const user = (await client.auth.getSession()).data.session?.user.email;
  const filename = `${getLocationFromEmail(user as string)}_${ordinance_id}`;

  const { error } = await client.from("ordinance_files").insert([
    {
      ordinance_id: ordinance_id,
      file_path: `${getLocationFromEmail(user as string)}/${filename}`,
      file_name: filename,
      author: await client
        .from("youth_official")
        .select("id")
        .eq("email", user)
        .single(),
    },
  ]);

  if (error) {
    return console.log("Error saving your document: ", error);
  }

  return console.log("Success uploading your file");
};
