import client from "@/src/api/client"
import { getLocFromAuth } from "./convert";


export const getPendingProjects = async () => {
    const location = await getLocFromAuth()
    console.log(location)

    const { data, error } = await client.from("projects").select("*").in("status", ["For Approval", "Action Pending", "Declined"]).eq("location_id", location)

    if (error) {
        console.error("Error fetching projects:", error);
        return null;
    }

    console.log(data)

    return data
}