import client from "@/src/api/client";
import { FormEvent, RefObject } from "react";
import { locNameToID } from "./convert";


export const postFeedback = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement>, id: string) => {
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
}

export const getFeedback = async(id: number) => {
    const { data, error } = await client.from("feedback").select("*").eq("location", id).order("created_at", { ascending: false });

    if(error || data.length == 0) {
        console.log("Error fetching data: ", error)
        return null;
    }

    return data;
}