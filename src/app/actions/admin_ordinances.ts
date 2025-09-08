import client from "@/src/api/client";
import { ordinance } from "../lib/definitions";

// Convert email → user id
const emailToUserID = async (email: string) => {
    const id = await client.from("youth_official").select("id").eq("email", email);

    if (id.data && id.data.length > 0) {
        return id.data[0].id as string;
    } else {
        console.log("Unable to find the user data");
        return " ";
    }
};

// Get all ordinances (pending or otherwise)
export const getPendingOrdinances = async () => {
    const { data, error } = await client.from("ordinances").select("*").order("id", { ascending: false }).eq("status", "Pending");

    if (error) {
        console.log("Error fetching data: ", error);
        return [];
    }

    return data;
};

// View ordinances authored by the logged-in user
export const viewOwnOrdinance = async () => {
    const { data: userData } = await client.auth.getSession();
    const userID = await emailToUserID(userData?.session?.user.email as string);

    const { data, error } = await client
        .from("ordinances")
        .select("*")
        .eq("author", userID);

    if (error) {
        console.log("Error matching UserID to an ordinance: ", error);
        return [];
    }

    return data;
};

// Get ordinance by title
export const getOrdinanceByName = async (title: string) => {
    const { data, error } = await client
        .from("ordinances")
        .select("*")
        .eq("title", title)
        .limit(1)
        .single();

    if (error) {
        console.log("Error fetching the data: ", error);
        return null;
    }

    console.log("Ordinance found: ", data);
    return data as ordinance;
};

// Get all files attached to an ordinance
export const getFilesPerOrdinance = async (id: number) => {
    const { data, error } = await client
        .from("ordinance_files")
        .select("*")
        .eq("ordinance_id", id);

    if (error) {
        console.log("Error retrieving files: ", error);
        return [];
    }

    console.log("files found: ", data);
    return data;
};

// Get all approvals per ordinance
export const getApprovalPerOrdinance = async (id?: number) => {
    if (!id) {
        console.log("No ordinance ID provided");
        return [];
    }

    const { data, error } = await client
        .from("ordinance_approvals")
        .select("*")
        .eq("ordinance_id", id)
        .order("id", { ascending: true });

    if (error) {
        console.log("Error getApprovalPerOrdinance: ", error);
        return [];
    }

    return data ?? [];
};

// Update approval + auto-update ordinance status if needed
export const updateApproval = async (
    approvalId: number,
    updates: {
        status?: string;
        date_started?: string | null;
        date_completed?: string | null;
        responsible_office?: string | null;
        remarks?: string | null;
    }
) => {
    const { data: updatedApproval, error: updateError } = await client
        .from("ordinance_approvals")
        .update(updates)
        .eq("id", approvalId)
        .select("*")
        .single();

    if (updateError) {
        console.log("Error updating approval: ", updateError);
        return null;
    }

    console.log("Approval updated: ", updatedApproval);

    if (!updatedApproval) return null;

    const { data: approvals, error: approvalsError } = await client
        .from("ordinance_approvals")
        .select("status")
        .eq("ordinance_id", updatedApproval.ordinance_id);

    if (approvalsError) {
        console.log("Error fetching approvals: ", approvalsError);
        return updatedApproval;
    }

    let newStatus: string | null = null;

    if (approvals.some((a) => a.status === "vetoed")) {
        newStatus = "Vetoed";
    } else if (approvals.every((a) => a.status === "approved")) {
        newStatus = "Uploaded";
    }

    if (newStatus) {
        const { error: ordinanceError } = await client
            .from("ordinances")
            .update({ status: newStatus })
            .eq("id", updatedApproval.ordinance_id);

        if (ordinanceError) {
            console.log("Error updating ordinance status: ", ordinanceError);
        } else {
            console.log(
                `Ordinance ${updatedApproval.ordinance_id} status set to ${newStatus}`
            );
        }
    }

    return updatedApproval;
};


export const updatedNowByID = async (ordinanceId: number) => {
    const { error } = await client
        .from("ordinances")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", ordinanceId);

    if (error) {
        console.error("Error updating updated_at:", error);
        return false;
    }
    return true;
};


// ====================================================== //
// ================== FILE HANDLING ===================== // 
// ====================================================== //

// Upload a file (only if not null)
export const uploadOrdinanceFile = async (
    ordinanceId: number,
    file: File | null
) => {
    if (!file) {
        console.log("No file provided, skipping upload.");
        return null;
    }

    const filePath = `ordinances/${ordinanceId}/${file.name}`;

    const { data, error } = await client.storage
        .from("ordinances-pending")
        .upload(filePath, file, {
            upsert: true, // overwrite if same filename
        });

    if (error) {
        console.error("Error uploading ordinance file:", error);
        return null;
    }

    console.log("File uploaded:", data);
    return data.path; // return the path for DB insertion
};

// Save file reference to ordinance_files table
export const addFileToOrdinance = async (
    ordinanceId: number,
    file: File | null
) => {

    if (!file) {
        console.log("No file provided, skipping file insert for ordinance:", ordinanceId);
        return;
    }
    const filePath = await uploadOrdinanceFile(ordinanceId, file);


    if (!filePath) {
        console.log("Upload failed or no file path, skipping DB insert.");
        return;
    }

    const { error } = await client
        .from("ordinance_files")
        .insert([{ ordinance_id: ordinanceId, file_path: filePath }]);

    if (error) {
        console.error("Error saving file reference:", error);
    } else {
        console.log("File reference saved for ordinance:", ordinanceId);
    }
};

