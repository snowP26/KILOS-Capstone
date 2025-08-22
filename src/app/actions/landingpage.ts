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