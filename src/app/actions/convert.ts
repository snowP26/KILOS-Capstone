import client from "@/src/api/client"

export const locNameToID = async (loc: string) => {
    const { data, error } = await client.from("location").select("id").eq("name", loc);

    if(error || data==null) {
        return console.log("Data not found: ", error)
    } 

    console.log(data[0].id)

    return data[0].id as number
}