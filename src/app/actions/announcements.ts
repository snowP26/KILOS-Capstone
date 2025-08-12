import client from "@/src/api/client";

import { FormEvent, RefObject } from "react";
import Swal from "sweetalert2";



// upload photo function
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


// Post announcements function
export const postAnnouncements = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = {
        title: formData.get("title") as string,
        body: formData.get("body") as string,
        type: formData.get("type") as string,
        image: formData.get("image") as File
    };

    if (form.type == null) {
        return alert('Type should not be null');
    }

    const filename = `${Date.now()}-${form.image.name}`;
    const session = await client.auth.getSession();
    const user = session.data.session?.user.email || null;
    let photoFilename: string | null = null;

    if (form.image && form.image.size > 0) {
        await uploadFile(form.image, filename);
        photoFilename = filename;
    }

    const { error } = await client.from("announcement").insert([{
        header: form.title,
        body: form.body,
        photo: photoFilename,
        author_email: user,
        type: form.type
    }]);

    if (error) {
        console.error("Failed to insert announcement:", error.message);
    }


    Swal.fire({
        title: "Announcement Posted!",
        text: "Your announcement has been successfully posted!",
        icon: "success"
    })
    if (formRef.current) return formRef.current.reset();

}


// Get Announcements Function
export const getAnnouncments = async () => {
    const { data, error } = await client.from("announcement").select("*").order("created_at", { ascending: false })

    if (error) {
        console.log("Error loading data: ", error);
    }

    return data
}


// Delete Announcements Function
export const deleteAnnouncements = async (id: number) => {
    async function deletePhoto(filename: string) {
        const { error } = await client.storage.from('users').remove([`announcements/${filename}`]);

        if (error) {
            console.error("Error deleting image:", error);
            throw new Error(error.message);
        }

        console.log("Image deleted successfully");
    }

    const { data } = await client.from("announcement").select("photo").eq("id", id).single();

    deletePhoto(data?.photo);

    const { error } = await client.from("announcement").delete().eq("id", id);

    if (error) {
        Swal.fire({
            title: 'Error',
            text: `Error deleting your announcement: ${error}`,
            icon: 'warning'
        })
        return;
    }

    Swal.fire({
        title: "Delete successful",
        text: "You have successfully deleted the announcement.",
        icon: "success"
    });


    return;
}


// Get current user function
export const getCurrentUser = async () => {
    const { data, error } = await client.auth.getSession();

    if (error) {
        console.log("getCurrentUser function error: ", error)
    }

    return data.session?.user.email
}


// Set pinned announcements function
export const setPinned = async (id: number) => {

    // get session data
    const session = await client.auth.getSession();
    const user = session?.data.session?.user.id
    
    // if the announcement is already pinned, unpin the announcement
    const { data: pinExist } = await client
        .from("pinned_announcements")
        .select("*")
        .eq("announcement_id", id)
        .eq("user_id", user)
        


    if (pinExist && pinExist.length > 0) {
        await client
            .from("pinned_announcements")
            .delete()
            .eq("announcement_id", id)
            .eq("user_id", user);

        return;
    }
    const { error } = await client.from("pinned_announcements").insert([{
        user_id: user,
        announcement_id: id,
    }])
    
    if (error) {
        return console.log("Unable to pin announcement: ", error);
    }
    
    return console.log('You have pinned the announcement.')
};


export const fetchPinned = async () => {
    const user = (await client.auth.getSession()).data.session?.user.id;

    const { data } = await client.from("pinned_announcements").select("announcement_id").eq("user_id", user);

    if (!data) {
        return [];
    }
    return data.map(row => row.announcement_id);
}

