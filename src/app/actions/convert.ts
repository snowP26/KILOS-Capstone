import client from "@/src/api/client"

export const locNameToID = async (loc: string) => {
    const { data, error } = await client.from("location").select("id").eq("name", loc.trim());

    console.log(`Loc: ${loc}`)
    console.log(`Data: ${data}`)

    if(error || data==null) {
        return console.log("Data not found: ", error)
    } 


    return data[0].id as number
}