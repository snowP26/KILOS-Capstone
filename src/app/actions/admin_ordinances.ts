import client from "@/src/api/client"

const emailToUserID = async (email: string) => {
    const id = await client.from("youth_official").select("id").eq("email", email);

    if(id.data){
        return id.data[0].id as string
    } else {
        console.log("Unable to find the user data")
        return " ";
    }
}

export const getPendingOrdinances = async() => {
    const { data, error } = await client.from("ordinances").select("*")

    if(error) return console.log("Erorr fetching data: ", error)
    
    return data;
}

export const viewOwnOrdinance = async () => {
    const { data: userData } = await client.auth.getSession();
    const userID = emailToUserID(userData.session?.user.email as string);
    const { data, error } = await client.from("ordinances").select("*").eq("author", userID)

    if(error) return console.log("Error matching UserID to an ordinance: ", error);

    return data;
}