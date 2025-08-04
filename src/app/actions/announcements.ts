import client from "@/src/api/client";
import { FormEvent } from "react";
import Swal from "sweetalert2";

export const postAnnouncements = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const imageFile = formData.get("image") as File;

  const session = await client.auth.getSession();
  const user = session.data.session?.user.id;

  if (!imageFile || !imageFile.name) {
    Swal.fire("Error", "Please upload a valid image", "error");
    return;
  }

  // Generate unique file path
  const fileExt = imageFile.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `announcements/${fileName}`;

  // Upload image to Supabase Storage
  const { error: uploadError } = await client.storage
    .from("users")
    .upload(filePath, imageFile);

  if (uploadError) {
    console.error("Upload Error:", uploadError);
    Swal.fire("Error", "Image upload failed", "error");
    return;
  }

  // Construct the public URL (optional but helpful)
  const { data: publicUrlData } = client.storage
    .from("users")
    .getPublicUrl(filePath);
  const imageUrl = publicUrlData?.publicUrl;

  // Insert announcement into DB
  const { error: insertError } = await client.from("announcement").insert([
    {
      header: title,
      body: body,
      authorID: user,
      image_url: imageUrl, // Save public URL or path
    },
  ]);

  if (insertError) {
    console.error("Insert Error:", insertError);
    Swal.fire("Error", "Announcement creation failed", "error");
    return;
  }

  Swal.fire("Success", "Announcement added successfully!", "success");
};
