import client from "@/src/api/client";
import { getLocFromAuth, getUserID, locIDtoName } from "./convert";
import { FormEvent } from "react";

export const getProjects = async () => {
    const loc = await getLocFromAuth();

    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number).eq("status", "Approved");


    if (error) {
        console.error("Error retrieving projects:", error);
        return [];
    }

    if (!data || data.length === 0) {
        return [];
    }

    console.log("Projects retrieved:", data);
    return data;
};

export const getProposedProjects = async () => {
    const loc = await getLocFromAuth();


    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number)
        .neq("status", "Approved")
        .order("id", {ascending: false});

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

    if(file){

    await uploadFile(file, title, data ? data[0].id : null)  
    }
    if(error) return console.log(error);

    console.log(`${userID}, ${location_id}, ${title}, ${description}`)
}

export const getProjectByID = async (id: number | undefined) => {
    if(id == undefined) return null


    const { data, error } = await client.from("projects").select("*").eq("id", id)

    if(!data){
        console.log("No Project found!")
        return null
    } 

    if(error){
        console.log("Error in fetching project", error)
        return null
    }

    return data[0]
}

export const getProposedProjectByID = async (id: number|string) => {
    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("id", id).single();

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

export const uploadPhotoByID = async (id: number|string, file: File) => {
    const locID = await getLocFromAuth();
    const locName = await locIDtoName(locID);
    const filepath = `photos/${locName}/${id}`

    const { error: storageError } = await client.storage.from("projects").upload(filepath, file, {upsert: true})
    if(storageError){
        console.log("Error in uploading your photo: ", storageError)
        return
    }

    const { data: publicUrlData } = client.storage
        .from("projects")
        .getPublicUrl(filepath);

    const publicURL = publicUrlData?.publicUrl;

    if (!publicURL) {
        console.error("Could not retrieve public URL for uploaded photo.");
        return;
    }

    const { error } = await client.from("projects").update([{imageURL: publicURL}]).eq("id", id);
    console.log("Test:", id)

    if(error){
        console.log("Error in uploading to the database schema: ", error)
        return
    }

    return
}

export const deleteProjectPhoto = async (id: number|string) => {
    const locID = await getLocFromAuth();
    const locName = await locIDtoName(locID);
    const filepath = `photos/${locName}/${id}`
    const { error: storageError } = await client.storage.from("projects").remove([filepath]) 
    
    if(storageError){
        console.log("Error deleting photo in storage: ", storageError);
        return;
    }

    const { error: dbError } = await client.from("projects").update({imageURL: null}).eq("id", id);

    if(dbError){
        console.log("Error in deleting imgUrl in db: ", dbError)
        return
    }

    console.log("Successfully deleted data.")
    return
}

export const getProjectByTitle = async (title: string) => {
    const {data, error} = (await client.from("projects").select("*").eq("title", title));

    if(data && data[0].length == 0){
        console.log("No record was found")
        return null
    }

    if(error){
        console.log("Error retrieving your project: ", error)
        return null
    }

    return data[0]
}

export const getApprovalsByID = async (id: number) => {

    const {data, error} = await client
        .from("project_approvals")
        .select("*")
        .eq("project_id", id);

    if(!data){
        console.log("No data has been found")
        return [];
    }

    if(error) {
        console.log("Error retrieving your approvals: ", error)
        return [];
    }

    return data 
}

export const updateTargetDate = async (id: number, date: string) => {
    if(!id) return 

    console.log(date)

    const { error } = await client 
        .from("projects")
        .update({"target_date": date}) 
        .eq("id", id)

    if(error) {
        console.log("Error in updating your project target date: ", error)
        return
    }

    return
}

export const getProjectBudgetById = async (project_id: number) => {
    const { data, error } = await client 
        .from("project_budget")
        .select("*")
        .eq("project_id", project_id)
}