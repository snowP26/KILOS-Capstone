import client from "@/src/api/client";
import Swal from "sweetalert2";



export const getUsersByLoc = async (locID: number) => {

    const { data: userData, error: userError } = await client
        .from("youth_officials_with_positions")
        .select("*")
        .eq("position_location", locID);

    if (!userData) {
        console.log("No records were found");
        return []
    }

    if (userData.length <= 0) {
        console.log("No records were found!");
        return []
    }

    if (userError) {
        console.log("Error retrieving youth official data: ", userError)
        return []
    }

    console.log("Successfully retrieved youth official data")
    return userData
}

export const createNewCode = async (loc: number, position: string, role: string) => {

    try {
        if (position == "") throw new Error("Position is required");
        
        if (position.toLowerCase() !== "admin" && position.toLowerCase() !== "super admin") {
            const { data: existing, error: fetchError } = await client
                .from("positions")
                .select("*")
                .eq("position", position)
                .eq("location", loc)
                .limit(1);

            if (fetchError) {
                throw new Error(fetchError?.message);
            }

            if (existing && existing.length > 0) {
                throw new Error("Position already exists")
            }
        }

        const { data, error } = await client.from("positions").insert([
            {
                position: position,
                role: role,
                location: loc,
            },
        ]);

        if (error) {
            throw new Error(error.message)
        }

        Swal.fire({
            icon: "success",
            title: "Position Added",
            text: `${position} (${role}) has been successfully created. Please refresh the page.`,
            timer: 1250
        })

        return data;
    } catch (err) {
        console.error("Unexpected error:", err);
        await Swal.fire({
            icon: "error",
            title: "Unexpected Error",
            text: "Something went wrong.",
        });
        return [];
    }
};
