import client from "@/src/api/client";
import { getLocFromAuth, getUserID } from "./convert";
import { FormEvent } from "react";
import { RefObject } from "@fullcalendar/core/preact.js";

export const getProjects = async () => {
    const loc = await getLocFromAuth();
    console.log("loc:", loc);

    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number);

    if (error) {
        console.error("Error retrieving projects:", error);
        return [];
    }

    if (!data || data.length === 0) {
        console.warn("No projects found for this location.");
        return [];
    }

    console.log("Projects retrieved:", data);
    return data;
};

export const postProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userID = await getUserID();
    const location_id = await getLocFromAuth()

    const title = formData.get("title") as string;
    const description = formData.get("details") as string;
    const file = formData.get("document") as File

    const { error } = await client.from("projects").insert([{
        title: title,
        description: description,
        status: "Pending",
        location_id: location_id,
        author: userID
    }])

    if(error) return console.log(error);

    console.log(`${userID}, ${location_id}, ${title}, ${description}`)
}