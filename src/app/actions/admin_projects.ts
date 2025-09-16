import client from "@/src/api/client"
import { getLocFromAuth } from "./convert";


export const getPendingProjects = async () => {
    const location = await getLocFromAuth()

    const { data, error } = await client.from("projects").select("*").in("status", ["For Approval", "Action Pending", "Declined"]).eq("location_id", location)

    if (error) {
        console.error("Error fetching projects:", error);
        return null;
    }

    console.log(data)

    return data
}

export const getProjectApprovals = async(id: number|undefined) => {
    if(!id) return []

    const { data, error } = await client.from("project_approvals").select("*").eq("id", id)

    if(!data ){
        console.log("Project does not exist");
        return []
    }

    if(error){
        console.log("Error retrieving your project: ", error);
        return []
    }
    
    console.log("getProjectApprovals: ", data)
    return data ?? []
}

export const addProjectApproval = async(id: number|undefined) => {
    if(!id) return []

    const { error } = await client.from("project_approvals").insert([{
        project_id: id
    }])

    if(error){
        console.log('Error inserting approval for your project: ', error );
        return
    }

    return
}