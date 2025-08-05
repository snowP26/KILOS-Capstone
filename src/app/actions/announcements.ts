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
    if(!data) return console.log("no image found")
    console.log(data);
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
    const user = session.data.session?.user.id || null;
    
    


    if(form.image.size <= 0){
        const { error } = await client.from("announcement").insert([{header: form.title, body: form.body, photo: null, authorID: user}]);
        if (error) return console.log("Error: ", error);
    } else {
        await uploadFile(form.image, filename);
        const { error } = await client.from("announcement").insert([{header: form.title, body: form.body, photo: filename, authorID: user}]);
        if (error) return console.log("Error: ", error);
    }
    
    
    Swal.fire({
        title: "Announcement Posted!",
        text: "Your announcement has been successfully posted!",
        icon: "success"
    })
    if(formRef.current) return formRef.current.reset();

}

export const getAnnouncments = async() => {
    const { data, error } = await client.from("announcement").select("*").order("created_at", { ascending: false })

    if(error){
        console.log("Error loading data: ", error);
    }

    return data
}