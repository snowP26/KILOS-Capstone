import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";
import Swal from "sweetalert2";
import { getLocFromAuth, getUserID, locIDtoName } from "./convert";

const checkTitleDuplicates = async (uploadValue: string) => {
  const { data, error } = await client
    .from("ordinances")
    .select("id")
    .eq("title", uploadValue);

  if (error) {
    console.error("Error checking the duplicates:", error);
    return false;
  }

  return data.length > 0;
};

const getLocationFromEmail = async (email: string) => {
  const { data, error } = await client
    .from("youth_official")
    .select("location")
    .eq("email", email)
    .single();

  if (error || !data) {
    console.error("Error retrieving location:", error || "No data found");
    return null;
  }

  const { data: locationData } = await client
    .from("location")
    .select("name")
    .eq("id", data.location)
    .single();

  return locationData?.name?.trim() || null;
};

export const postOrdinance = async (
  e: FormEvent<HTMLFormElement>,
  formRef: RefObject<HTMLFormElement>
) => {
  e.preventDefault();

  const formdata = new FormData(e.currentTarget);
  const title = `${formdata.get("title-year") as string}-${
    formdata.get("title-number") as string
  }`;
  const description = formdata.get("description") as string;
  const file = formdata.get("document") as File;

  if (await checkTitleDuplicates(title)) {
    Swal.fire({
      title: "Duplicate Ordinance",
      text: "An ordinance with this title already exists.",
      icon: "warning",
    });
    return;
  }

  // Get current user's email
  const { data: sessionData } = await client.auth.getSession();
  const email = sessionData.session?.user.email;
  if (!email) {
    console.error("No logged-in user found");
    return;
  }

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

  // Show loader
  Swal.fire({
    title: "Posting Ordinance...",
    text: "Please wait while we save your ordinance.",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  // Insert ordinance
  const { data: insertedOrdinance, error: insertError } = await client
    .from("ordinances")
    .insert([
      {
        title,
        description,
        location: userData.location,
        author: userData.id,
        updated_at: new Date().toISOString(),
      },
    ])
    .select("id")
    .single();

  if (insertError || !insertedOrdinance) {
    console.error("Error posting ordinance:", insertError);
    Swal.fire({
      title: "Error",
      text: "Something went wrong while posting the ordinance.",
      icon: "error",
    });
    return;
  }

  const ordinanceID = insertedOrdinance.id;

  // Get verbose location once
  const { data: verboseLocation } = await client
    .from("location")
    .select("name")
    .eq("id", userData.location)
    .single();

  if (!verboseLocation) {
    Swal.fire({
      title: "Error",
      text: "Location not found.",
      icon: "error",
    });
    return;
  }

  // Handle file only if it exists
  if (file && file.name) {
    const fileName = `${verboseLocation.name.trim()}_${ordinanceID}_${
      file.name
    }`;
    const filepath = `${verboseLocation.name.trim()}/${fileName}`;

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
      console.error("Error uploading document metadata: ", docError);
      Swal.fire({
        title: "Error",
        text: "Failed to save document metadata.",
        icon: "error",
      });
      return;
    }

    // Upload to storage bucket
    const { error: bucketError } = await client.storage
      .from("ordinances")
      .upload(filepath, file);

    if (bucketError) {
      console.error("Bucket error: ", bucketError);
      Swal.fire({
        title: "Error",
        text: "Failed to upload document to storage.",
        icon: "error",
      });
      return;
    }
  }

  setTimeout(() => {
    Swal.fire({
      title: "Ordinance Successfully posted!",
      text: "Please contact your official counterpart for ordinance posting approval.",
      icon: "success",
    });
  }, 750);

  formRef.current?.reset();
};

export const uploadFile = async (ordinance_id: number, doc: File) => {
  if (!doc) {
    console.log("No File detected, skipping upload.");
    return;
  }

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
    console.error("Error saving your document: ", error);
    return;
  }

  console.log("Success uploading your file");
};

export const getOrdinancesByLocID = async () => {
  const locID = await getLocFromAuth();
  const { data, error } = await client
    .from("ordinances")
    .select("*")
    .eq("location", locID)
    .eq("status", "Uploaded");

  if (error) {
    Swal.fire({
      title: `Error loading ordinances`,
      text: `Error: : ${error}`,
      icon: "error",
    });

    return [];
  }

  return data;
};

export const getPendingOrdinances = async () => {
  const locID = await getLocFromAuth();
  const userID = await getUserID();
  const { data, error } = await client
    .from("ordinances")
    .select("*")
    .eq("location", locID)
    .eq("status", "Pending")
    .eq("author", userID);

  if (error) {
    Swal.fire({
      title: `Error loading ordinances`,
      text: `Error: : ${error}`,
      icon: "error",
    });

    return [];
  }

  return data;
};

export const getOrdinanceByTitle = async (id: string) => {
  const { data, error } = await client
    .from("ordinances")
    .select("*")
    .eq("title", id);

  if (error) {
    console.log("Error retrieving your data: ", error);
    return [];
  }

  return data ?? [];
};

export const getPendingOrdinanceStatus = async (id: number) => {
  const { data, error } = await client
    .from("ordinance_approvals")
    .select("*")
    .eq("ordinance_id", id)
    .order("id", { ascending: true });

  if (error) {
    console.log("Error retrieving your data: ", error);
    return [];
  }

  return data ?? [];
};

export const openOrdinancePDF = async (ordinanceID: number) => {
  const { data: ordinancefile, error: ordinanceFileError } = await client
    .from("ordinance_files")
    .select("file_path")
    .eq("ordinance_id", ordinanceID)
    .single();

  if (ordinanceFileError) {
    console.log("error reading ordinance");
    return;
  }

  console.log("ordinance file url: ", ordinancefile.file_path);

  const { data: url } = await client.storage
    .from("ordinances")
    .createSignedUrl(ordinancefile.file_path, 3600);

  // Open in a new tab
  if (url?.signedUrl) {
    window.open(url.signedUrl, "_blank");
    return;
  }

  console.log("File does not exist.");
  return url?.signedUrl || null;
};

export const getPendingOrdinanceFile = async (ordinanceID: number | undefined) => {
  const { data: ordinanceFileData, error: fileError } = await client
    .from("ordinance_files")
    .select("file_path")
    .eq("ordinance_id", ordinanceID)
    .single();

  if (fileError || !ordinanceFileData?.file_path) {
    console.log("No file path found for this ordinance.");
    return null;
  }

  const { data } = await client.storage
    .from("ordinances")
    .createSignedUrl(ordinanceFileData.file_path, 3600);

  if (data?.signedUrl) {
    const pathParts = ordinanceFileData.file_path.split("/");
    const name = pathParts[pathParts.length - 1];
    const type = name.split(".").pop() || "unknown";

    return { url: data.signedUrl, name, type };
  }

  return null;
};

export const deletePendingOrdinanceFile = async (ordinanceID: number) => {
  const filepath = await client
    .from("ordinance_files")
    .select("file_path")
    .eq("ordinance_id", ordinanceID)
    .single();

  const { error: bucketError } = await client.storage
    .from("ordinances")
    .remove([filepath.data?.file_path]);

  if (bucketError) {
    Swal.fire({
      title: "Error deleting the file.",
      text: `Try deleting again later, Error: ${bucketError}`,
      icon: "error",
    });

    return console.log("bucket error: ", bucketError);
  }

  const { error: dbError } = await client
    .from("ordinance_files")
    .delete()
    .eq("file_path", filepath.data?.file_path);

  if (dbError) {
    Swal.fire({
      title: "Error deleting the file.",
      text: `Try deleting again later, Error: ${dbError}`,
      icon: "error",
    });

    return console.log("db error: ", dbError);
  }

  return console.log("deletion success");
};

export const uploadOrdinanceFile = async (file: File, ordinanceID: number) => {
  try {
    if (!file) throw new Error("No file was provided.");

    const { data: authData } = await client.auth.getSession();

    const { data, error: dbError } = await client
      .from("ordinances")
      .select("location")
      .eq("id", ordinanceID)
      .single();

    if (dbError || !data) {
      throw new Error("No data was found: ", dbError);
    }

    const loc = await locIDtoName(data?.location);
    const filename = `${loc}/${loc}_${ordinanceID}_${file.name}`;

    const upload = await client.storage
      .from("ordinances")
      .upload(filename, file, { upsert: true });
    if (!upload) throw new Error("Error uploading the file, try again.");

    const { data: userData, error: userError } = await client
      .from("youth_official")
      .select("id")
      .eq("email", authData.session?.user.email)
      .single();

    if (userError || !userData) {
      throw new Error("Could not find user in youth_officials table.");
    }

    const authorID = userData.id;

    const { error: insertError } = await client.from("ordinance_files").insert({
      ordinance_id: ordinanceID,
      file_path: filename,
      file_name: `${loc}_${ordinanceID}_${file.name}`,
      author: authorID,
    });

    if (insertError) {
      throw new Error(
        `Error inserting into ordinance_files: ${insertError.message}`
      );
    }
  } catch (error) {}
};
