import client from "@/src/api/client"
import { locNameToID } from "./convert";

// =====================================================================================================================
// =================================================== Ordinances ======================================================
// =====================================================================================================================

export const getAllOrdinances = async (location: string | null) => {
  let dbQuery = client.from("ordinances").select("*").eq("status", "Uploaded")

  if (location && location !== null) {
    const locID = await locNameToID(location as string)
    dbQuery = dbQuery.eq("location", locID)
  }

  const { data, error } = await dbQuery

  if (error) {
    console.log("Error retrieving ordinances: ", error)
    return []
  }

  console.log("Data retrieval successful!", data);
  return data
}

export const getAllOrdinancesByLocation = async (location: number | null) => {
  let dbQuery = client.from("ordinances").select("*").eq("status", "Uploaded")

  if (location && location !== null) {
    dbQuery = dbQuery.eq("location", location)
  }

  const { data, error } = await dbQuery

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


  if (query) {
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




// Projects

export const getAllProjects = async () => {
  const { data, error } = await client.from("projects").select("*").eq("status", "Approved").order("target_date", { ascending: true })

  if (error) {
    console.log("Project data retrieval failed: ", error)
    return []
  }
  
  return data
}
