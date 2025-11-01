import client from "@/src/api/client"
import { getLocFromAuth } from "./convert";

export const getHomeFeedback = async () => {
    const location = await getLocFromAuth();

    const { data, error } = await client
        .from("feedback")
        .select("*")
        .eq("location", location)
        .limit(5)

    if (error) {
        console.log("Error retrieving feedback data: ", error);
        return []
    }

    return data;
}