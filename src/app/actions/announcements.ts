import client from "@/src/api/client";
import { FormEvent } from "react";

async function uploadFile(file: File, filename: string) {
    const { error } = await client.storage.from('users').upload(`announcements/${filename}`, file,);

    if (error) {
        return console.log("Error uploading file: ", error);
    }
    return console.log("Upload Successful")
    
}

export const postAnnouncements = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        image: formData.get("image") as File
    };

    const filename = `${Date.now()}-${form.image.name}`;
    const session = await client.auth.getSession();
    const user = session.data.session?.user.id || null;

    await uploadFile(form.image, filename);
    const { error } = await client.from("announcement").insert([{header: form.title, body: form.body, photo: filename, authorID: user}]);

    if (error) return console.log("Error: ", error);


    console.log("Announcement added successfully!")
    
}