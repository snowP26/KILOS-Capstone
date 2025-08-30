import client from "@/src/api/client"

// =====================================================================================================================
// =================================================== Ordinances ======================================================
// =====================================================================================================================

export const getAllOrdinances = async () => {
    const { data, error } = await client.from("ordinances").select("*").eq("status", "Vetoed"); // change it to approved.

    if (error) {
        console.log("Error retrieving ordinances: ", error)
        return []
    }

    console.log("Data retrieval successful!", data);
    return data
}

export const getOrdinanceByLocation = async (locationID: number) => {
    const { data, error } = await client.from("ordinances").select("*").eq("location", locationID);

    if (error) {
        console.log("Error retrieving ordinances: ", error)
        return []
    }

    console.log("Data retrieval successful!", data);
    return data
}


// =====================================================================================================================
// ================================================= Search Function ===================================================
// =====================================================================================================================

export const searchData = async(query: string) => {
    if (!query) return [];

    const { data, error } = await client.from("ordinances").select("*").or(`title.ilike.%${query}%, description.ilike.%${query}%`);

    if(error){
        console.log("Error fetching data: ", error)
        return []
    }

    return data;
}