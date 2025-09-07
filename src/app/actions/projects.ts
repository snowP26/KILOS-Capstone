import client from "@/src/api/client";
import { getLocFromAuth } from "./convert";

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