import client from "@/src/api/client"

export const locNameToID = async (loc: string) => {
    const { data, error } = await client.from("location").select("id").eq("name", loc.trim());

    console.log(`Loc: ${loc}`)
    console.log(`Data: ${data}`)

    if (error || data == null) {
        return console.log("Data not found: ", error)
    }


    return data[0].id as number
}

export const getLocFromAuth = async () => {
    const { data: userData, error: userError } = await client.auth.getUser();

    if (!userData) {
        return console.log("No authenticated user is found.")
    }

    if (userError) {
        return console.log("User error: ", userError)
    }

    const authEmail = userData.user.email;
    const { data, error } = await client.from("youth_official").select("location").eq("email", authEmail).single();

    if (error) {
        return console.log("There seems to be an error with the youth official", error)
    }

    return data.location as number;
}

export const authorIDtoName = async (id: number) => {
    const { data, error } = await client.from("youth_official").select("firstname, lastname").eq("id", id).single()

    if (error) {
        console.error("Error fetching author name:", error);
        return null; // or throw error if you want stricter handling
    }

    if (data) {
        return `${data.firstname} ${data.lastname}`;
    }

    return null;
};
