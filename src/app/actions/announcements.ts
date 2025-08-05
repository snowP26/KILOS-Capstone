import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";
import Swal from "sweetalert2";

export async function uploadFile(file: File, filename: string) {
    const { error } = await client.storage.from('users').upload(`announcements/${filename}`, file);

    if (error) {
        return console.log("Error uploading file: ", error);
    }
    return true
}

export async function getPhoto(fileName: string) {
    const { data } = await client.storage.from('users').getPublicUrl(`announcements/${fileName}`);
    if (!data) return console.log("no image found")
    return data.publicUrl;
}

export const postAnnouncements = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        image: formData.get("image") as File
    };

    const filename = `${Date.now()}-${form.image.name}`;
    const session = await client.auth.getSession();
    const user = session.data.session?.user.email || null;




    if (form.image.size <= 0) {
        const { error } = await client.from("announcement").insert([{ header: form.title, body: form.body, photo: null, author_email: user }]);
        if (error) return console.log("Error: ", error);
    } else {
        await uploadFile(form.image, filename);
        const { error } = await client.from("announcement").insert([{ header: form.title, body: form.body, photo: filename, author_email: user }]);
        if (error) return console.log("Error: ", error);
    }


    Swal.fire({
        title: "Announcement Posted!",
        text: "Your announcement has been successfully posted!",
        icon: "success"
    })
    if (formRef.current) return formRef.current.reset();

}

export const getAnnouncments = async () => {
    const { data, error } = await client.from("announcement").select("*").order("created_at", { ascending: false })

    if (error) {
        console.log("Error loading data: ", error);
    }

    return data
}

async function deletePhoto(filename: string) {
    const { error } = await client.storage.from('users').remove([`announcements/TEST.jpeg`, 'DL.jpg']);

    if (error) {
        console.error("Error deleting image:", error);
        throw new Error(error.message);
    }

    console.log("Image deleted successfully");
}

export const deleteAnnouncements = async (id: number) => {

    // const { data } = await client.from("announcement").select("photo").eq("id", id).single();

    // deletePhoto(data?.photo);

    // const { error } = await client.from("announcement").delete().eq("id", id);

    // if (error) {
    //     Swal.fire({
    //         title: 'Error',
    //         text: `Error deleting your announcement: ${error}`,
    //         icon: 'warning'
    //     })
    //     return;
    // }

    // Swal.fire({
    //     title: "Delete successful",
    //     text: "You have successfully deleted the announcement.",
    //     icon: "success"
    // });

    deletePhoto("TEST.jpeg")

    return;
}

export async function testDelete() {
    const { data, error } = await client.storage
    .from('users')
    .remove(['DL.jpeg', 'announcements/TEST.jpeg']);

    if (error) {
    console.error('Delete error:', error);
    return false;
    }
    console.log('Delete successful:', data);
    return true;
}