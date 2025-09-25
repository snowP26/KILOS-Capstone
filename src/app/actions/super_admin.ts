import client from "@/src/api/client";
import { getLocFromAuth } from "./convert"
import { id } from "date-fns/locale";


export const getUsersByLoc = async (locID: number) => {

    const { data: userData, error: userError } = await client
        .from("youth_as_positions")
        .select("*")
        .eq("location", locID);
    
    if(!userData){
        console.log("No records were found");
        return []
    }

    if(userData.length <= 0) {
        console.log("No records were found!");
        return []
    }

    if(userError){
        console.log("Error retrieving youth official data: ", userError)
        return []
    }

    console.log("Successfully retrieved youth official data")
    return userData
}