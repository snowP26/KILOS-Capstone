import client from "@/src/api/client";



export const getUsersByLoc = async (locID: number) => {

    const { data: userData, error: userError } = await client
        .from("youth_officials_with_positions")
        .select("*")
        .eq("position_location", locID);
    
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

export const createNewCode = async (loc: number, position: string, role: string)=>{

    
    const { data, error } = await client.from("positions").insert([{
        position: position,
        role: role,
        location: loc
    }])

    if(error){
        console.log("error in inserting data: ", error)
        return []
    }

    return data
}
