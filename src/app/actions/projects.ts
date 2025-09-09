import client from "@/src/api/client";
import { getLocFromAuth } from "./convert";
import { FormEvent } from "react";
import { RefObject } from "@fullcalendar/core/preact.js";

export const getProjects = async () => {
    const loc = await getLocFromAuth();

    const { data, error } = await client.from("projects").select("*").eq("location_id", loc);
    
    if(error || data.length == 0){
        console.log("getProjects func");
        console.log("Error retrieving projects: ", error);
        return
    }
    
    console.log(data[0])

    return data;
}

export const postProject = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    
}