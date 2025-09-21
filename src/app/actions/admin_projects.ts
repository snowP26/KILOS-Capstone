import client from "@/src/api/client"
import { getLocFromAuth } from "./convert";


export const getPendingProjects = async () => {
    const location = await getLocFromAuth()

    const { data, error } = await client.from("projects")
        .select("*")
        .neq("status", "Approved")
        .eq("location_id", location)
        .order("id", {ascending: false})

    if (error) {
        console.error("Error fetching projects:", error);
        return null;
    }

    console.log(data)

    return data
}

export const getProjectApprovals = async (id: number | undefined) => {
    if (!id) return []

    const { data, error } = await client.from("project_approvals").select("*").eq("project_id", id).order("id", { ascending: true });

    if (!data) {
        console.log("Project does not exist");
        return []
    }

    if (error) {
        console.log("Error retrieving your project: ", error);
        return []
    }

    console.log("getProjectApprovals: ", data)
    return data ?? []
}

export const addProjectApproval = async (id: number | undefined) => {
    if (!id) return []

    const { error } = await client.from("project_approvals").insert([{
        project_id: id
    }])

    if (error) {
        console.log('Error inserting approval for your project: ', error);
        return
    }

    return
}

export const deleteProjectApproval = async (id: number | undefined) => {
    if (!id) return false

    const { error } = await client.from("project_approvals").delete().eq("id", id)

    if (error) {
        console.error("Error deleting project approval:", error.message);
        return false;
    }

    return true;
}

export const updateProjectApproval = async (
    id: number,
    updates: { recipient?: string; status?: string; comments?: string }
) => {
    const { error } = await client
        .from("project_approvals")
        .update(updates)
        .eq("id", id);

    if (error) {
        console.error("Error updating approval:", error);
        return false;
    }

    return true;
};

export const updateProjectStatus = async (id: number, value: string | null) => {
    const { error } = await client.from("projects").update({"status": value}).eq("id", id)
    if(error){
        console.log("Error in updating project Status", error)
        return false
    }

    return true
}
