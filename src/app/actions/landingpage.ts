import client from "@/src/api/client"

// =====================================================================================================================
// =================================================== Ordinances ======================================================
// =====================================================================================================================

export const getAllOrdinances = async () => {
    const { data, error } = await client.from("ordinances").select("*").eq("status", "Uploaded"); // change it to approved.

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

export const searchData = async (query?: string, location?: number) => {
  if (!query) return [];

  let searchQuery = client
    .from("ordinances")
    .select("*")


    if(query){
    searchQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

  if (location) {
    searchQuery = searchQuery.eq("location", location);
  }

  const { data, error } = await searchQuery;

  if (error) {
    console.log("Error fetching data: ", error);
    return [];
  }

  return data;
};
