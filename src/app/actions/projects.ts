import client from "@/src/api/client";
import { getLocFromAuth, getUserID, locIDtoName } from "./convert";
import { FormEvent } from "react";

export const getProjects = async () => {
    const loc = await getLocFromAuth();
    console.log("loc:", loc);

    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number).eq("status", "Approved");

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

export const getProposedProjects = async () => {
    const loc = await getLocFromAuth();
    console.log("loc:", loc);

    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number).eq("status", "For Approval");

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

const uploadFile = async (file: File, title: string, projectID: number | null) => {
    if(!file) {
        console.log("walang file na nilagay");
        return 
    }

    const location_id = await getLocFromAuth()
    const location = await locIDtoName(location_id)
    const filename = `${location}_${title}_${file.name}`

    const { error: bucketError } = await client.storage.from("projects").upload(`files/${location}/${filename}`, file, { upsert: true })

    if(bucketError){
        console.log(`Error with uploadFile fucntion ${bucketError}`)
        return
    }

    const { error: dbError} = await client.from("project_files").insert([{
        project_id: projectID,
        filepath: `files/${location}/${filename}`,
        filename: filename,
    }])

    if(dbError) {
        console.log("Error with Database insert: ", dbError)
        return
    }
}

export const postProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userID = await getUserID();
    const location_id = await getLocFromAuth()

    const title = formData.get("title") as string;
    const description = formData.get("details") as string;
    const file = formData.get("document") as File

    const { data, error } = await client.from("projects").insert([{
        title: title,
        description: description,
        status: "For Approval",
        location_id: location_id,
        author: userID
    }]).select("id")

    await uploadFile(file, title, data ? data[0].id : null)  

    if(error) return console.log(error);

    console.log(`${userID}, ${location_id}, ${title}, ${description}`)
}

export const getProjectByID = async (projectID: string | undefined) => {
    if(projectID == undefined) return null

    const { data, error } = await client.from("projects").select("*").eq("title", projectID)

    if(!data || data[0].length <= 0){
        console.log("No Project found!")
        return null
    } 

    if(error){
        console.log("Error in fetching project", error)
        return null
    }

    return data[0]
}