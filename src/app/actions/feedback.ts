import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";
import { getUserID, locNameToID } from "./convert";


export const postFeedback = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement | null>, id: string) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const form = {
        header: formData.get("header") as string,
        body: formData.get("body") as string,
    }
    const location = await locNameToID(id)

    const { error } = await client
    .from("feedback")
    .insert([{
        header: form.header,
        body: form.body,
        location: location,
    }])

    if(error) {
        return console.log("Error in creating your feedback: ", error)
    }

    formRef.current?.reset()
    return console.log("Success")
}

export const getFeedback = async(id: number) => {
    const { data, error } = await client.from("feedback").select("*").eq("location", id).order("created_at", { ascending: false });

    if(error || data.length == 0) {
        console.log("Error fetching data: ", error)
        return null;
    }

    return data;
}

export const getComments = async (id: number) => {
    const { data, error } = await client.from("feedback_comments").select("*").eq("feedback_id", id);

    if(error){
        console.log("Error fetching comments: ", error);
        return []
    }

    console.log("Successfully retrieved comments!")
    return data ?? []
}

export const postComment =  async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement | null>, id: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = formData.get("comment") as string;
    const userID = await getUserID();


    const { error } = await client.from("feedback_comments").insert([{
        feedback_id: id,
        author_id: userID,
        content: body
    }])

    if(error){
        return console.log("Error posting your announcement: ", error)
    }
}