import client from "@/src/api/client";
import { getLocFromAuth, getUserID, locIDtoName } from "./convert";
import { FormEvent, RefObject } from "react";

export const getProjects = async () => {
    const loc = await getLocFromAuth();

    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number).eq("status", "Approved");


    if (error) {
        console.error("Error retrieving projects:", error);
        return [];
    }

    if (!data || data.length === 0) {
        return [];
    }

    console.log("Projects retrieved:", data);
    return data;
};

export const getProposedProjects = async () => {
    const loc = await getLocFromAuth();


    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("location_id", loc as number)
        .neq("status", "Approved")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error retrieving projects:", error);
        return [];
    }

    if (!data || data.length === 0) {
        console.warn("No projects found for this location.");
        return [];
    }

    console.log("Projects retrieved:", data);
    return data;
};

const uploadFile = async (file: File, title: string, projectID: number | null) => {
    if (!file) {
        console.log("walang file na nilagay");
        return
    }

    const location_id = await getLocFromAuth()
    const location = await locIDtoName(location_id)
    const filename = `${location}_${title}_${file.name}`

    const { error: bucketError } = await client.storage.from("projects").upload(`files/${location}/${filename}`, file, { upsert: true })

    if (bucketError) {
        console.log(`Error with uploadFile fucntion ${bucketError}`)
        return
    }

    const { error: dbError } = await client.from("project_files").insert([{
        project_id: projectID,
        filepath: `files/${location}/${filename}`,
        filename: filename,
    }])

    if (dbError) {
        console.log("Error with Database insert: ", dbError)
        return
    }
}

export const postProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userID = await getUserID();
    const location_id = await getLocFromAuth()

    const title = formData.get("title") as string;
    const description = formData.get("details") as string;
    const file = formData.get("document") as File

    const { data, error } = await client.from("projects").insert([{
        title: title,
        description: description,
        status: "For Approval",
        location_id: location_id,
        author: userID
    }]).select("id")

    if (file) {

        await uploadFile(file, title, data ? data[0].id : null)
    }
    if (error) return console.log(error);

    console.log(`${userID}, ${location_id}, ${title}, ${description}`)
}

export const getProjectByID = async (id: number | undefined) => {
    if (id == undefined) return null


    const { data, error } = await client.from("projects").select("*").eq("id", id)

    if (!data) {
        console.log("No Project found!")
        return null
    }

    if (error) {
        console.log("Error in fetching project", error)
        return null
    }

    return data[0]
}

export const getProposedProjectByID = async (id: number | string) => {
    const { data, error } = await client
        .from("projects")
        .select("*")
        .eq("id", id).single();

    if (error) {
        console.error("Error retrieving projects:", error);
        return [];
    }

    if (!data || data.length === 0) {
        console.warn("No projects found for this location.");
        return [];
    }

    console.log("Projects retrieved:", data);
    return data;
};

export const uploadPhotoByID = async (id: number | string, file: File) => {
    const locID = await getLocFromAuth();
    const locName = await locIDtoName(locID);
    const filepath = `photos/${locName}/${id}`

    const { error: storageError } = await client.storage.from("projects").upload(filepath, file, { upsert: true })
    if (storageError) {
        console.log("Error in uploading your photo: ", storageError)
        return
    }

    const { data: publicUrlData } = client.storage
        .from("projects")
        .getPublicUrl(filepath);

    const publicURL = publicUrlData?.publicUrl;

    if (!publicURL) {
        console.error("Could not retrieve public URL for uploaded photo.");
        return;
    }

    const { error } = await client.from("projects").update([{ imageURL: publicURL }]).eq("id", id);
    console.log("Test:", id)

    if (error) {
        console.log("Error in uploading to the database schema: ", error)
        return
    }

    return
}

export const deleteProjectPhoto = async (id: number | string) => {
    const locID = await getLocFromAuth();
    const locName = await locIDtoName(locID);
    const filepath = `photos/${locName}/${id}`
    const { error: storageError } = await client.storage.from("projects").remove([filepath])

    if (storageError) {
        console.log("Error deleting photo in storage: ", storageError);
        return;
    }

    const { error: dbError } = await client.from("projects").update({ imageURL: null }).eq("id", id);

    if (dbError) {
        console.log("Error in deleting imgUrl in db: ", dbError)
        return
    }

    console.log("Successfully deleted data.")
    return
}

export const getProjectByTitle = async (title: string) => {
    const { data, error } = (await client.from("projects").select("*").eq("title", title));

    if (data && data[0].length == 0) {
        console.log("No record was found")
        return null
    }

    if (error) {
        console.log("Error retrieving your project: ", error)
        return null
    }

    return data[0]
}

export const getApprovalsByID = async (id: number) => {

    const { data, error } = await client
        .from("project_approvals")
        .select("*")
        .eq("project_id", id);

    if (!data) {
        console.log("No data has been found")
        return [];
    }

    if (error) {
        console.log("Error retrieving your approvals: ", error)
        return [];
    }

    return data
}

export const updateTargetDate = async (id: number, date: string) => {
    if (!id) return

    console.log(date)

    const { error } = await client
        .from("projects")
        .update({ "target_date": date })
        .eq("id", id)

    if (error) {
        console.log("Error in updating your project target date: ", error)
        return
    }

    return
}

export const getProjectBudgetById = async (project_id: number) => {

    const { data, error } = await client
        .from("project_budget")
        .select("*")
        .eq("project_id", project_id)

    if (error) {
        console.log("error retrieving your project's budget data: ", error)
        return []
    }
    console.log(data)
    return data;
}

export const addBudget = async (e: FormEvent<HTMLFormElement>, formRef: RefObject<HTMLFormElement | null>, project: string, projectID: number) => {
    e.preventDefault();

    if (!formRef.current) {
        console.error("Form reference is missing");
        return;
    }

    const authLoc = await getLocFromAuth();
    const loc = authLoc ? await locIDtoName(authLoc) : "unknown";
    const form = e.currentTarget as HTMLFormElement
    const formdata = new FormData(formRef.current);

    const item = formdata.get("item_name") as string;
    const price = Number(formdata.get("price"));
    const amt = Number(formdata.get("amt"))
    const receipt = formdata.get("receipt") as File
    const item_photo = formdata.get("item_photo") as File
    let receiptURL = null;
    let itemURL = null;

    if (receipt && receipt.size > 0) {
        const filename = `${loc}_${item}_receipt_${Date.now()}`;
        const { error } = await client
            .storage
            .from("projects")
            .upload(`photos/${loc}/${project}/receipts/${filename}`, receipt, { upsert: false });

        if (error) {
            console.log("Error saving to receipt bucket", error);
            return;
        }

        // Get public URL
        const { data: publicUrlData } = client
            .storage
            .from("projects")
            .getPublicUrl(`photos/${loc}/${project}/receipts/${filename}`);

        receiptURL = publicUrlData.publicUrl;
    }

    if (item_photo && item_photo.size > 0) {
        const filename = `${loc}_${item}_${Date.now()}`;
        const { error } = await client
            .storage
            .from("projects")
            .upload(`photos/${loc}/${project}/items/${filename}`, item_photo, { upsert: false });

        if (error) {
            console.log("Error saving to receipt bucket", error);
            return;
        }

        // Get public URL
        const { data: publicUrlData } = client
            .storage
            .from("projects")
            .getPublicUrl(`photos/${loc}/${project}/items/${filename}`);

        itemURL = publicUrlData.publicUrl;
    }

    const { error } = await client
        .from("project_budget")
        .insert([{
            project_id: projectID,
            status: "For Approval",
            item_name: item,
            price: price,
            amt: amt,
            receiptURL: receiptURL,
            photoURL: itemURL
        }])

    if (error) {
        console.log("Error inserting budget record: ", error);
        return
    }

    if (formRef.current) {
        formRef.current.reset()
    }
}

export const uploadReceipt = async (budgetID: number, file: File, project: string) => {
    const locNumber = await getLocFromAuth()
    const loc = await locIDtoName(locNumber);

    // loc_itemname_dateNow
    const { data: budgetData, error: budgetError } = await client.from("project_budget").select("item_name").eq("id", budgetID);

    if (budgetError) {
        console.log("Error in retrieving the budget: ", budgetError)
        return
    }

    const itemName = budgetData[0].item_name
    const filename = `${loc}_${itemName}_receipt_${Date.now()}`
    const filepath = `photos/${loc}/${project}/items/${filename}`

    const { error: bucketError } = await client
        .storage
        .from("projects")
        .upload(filepath, file)

    if (bucketError) {
        console.log(`Error in saving file to the bucket: ${bucketError}`)
    }

    const { data: publicUrlData } = client
        .storage
        .from("projects")
        .getPublicUrl(filepath);

    const receiptURL = publicUrlData.publicUrl;

    const { data: clientData, error: clientError } = await client
        .from("project_budget")
        .update({ receiptURL })
        .eq("id", budgetID)
        .select();

    if (clientError) {
        console.error("Error uploading receipt:", clientError);
        return null;
    }

    return clientData;
};

export const uploadItemPhoto = async (budgetID: number, file: File, project: string) => {

    // get the location
    const locNumber = await getLocFromAuth()
    const loc = await locIDtoName(locNumber);

    // get the item_name
    const { data: budgetData, error: budgetError } = await client.from("project_budget").select("item_name").eq("id", budgetID);

    if (budgetError) {
        console.log("Error in retrieving the budget: ", budgetError)
        return
    }

    const itemName = budgetData[0].item_name
    const filename = `${loc}_${itemName}_item-photo_${Date.now()}`
    const filepath = `photos/${loc}/${project}/items/${filename}`

    console.log("filepath: ", filepath)

    const { error: bucketError } = await client
        .storage
        .from("projects")
        .upload(filepath, file)

    if (bucketError) {
        console.log(`Error in saving file to the bucket: ${bucketError}`)
    }

    const { data: publicUrlData } = client
        .storage
        .from("projects")
        .getPublicUrl(filepath);

    const photoURL = publicUrlData.publicUrl;

    const { data: clientData, error: clientError } = await client
        .from("project_budget")
        .update({ photoURL })
        .eq("id", budgetID)
        .select();

    if (clientError) {
        console.error("Error uploading receipt:", clientError);
        return null;
    }

    return clientData;
};


export const deletePhoto = async (itemID: number, item: boolean) => {
    const basePath = `storage/v1/object/public/projects/`;

    const col = item ? 'photoURL' : 'receiptURL'

    const { data: dbData, error: dbError } = await client
        .from("project_budget")
        .select(col)
        .eq("id", itemID)


    if (dbError) {
        console.log("Error fetching URL: ", dbError)
        return
    }

    if (!dbData) return console.log("No Data found.")

    const photoURL = (dbData[0] as Record<string, string | null>)[col]
    if (!photoURL) return

    const filePath = photoURL?.includes(basePath) ? photoURL.split(basePath)[1] : photoURL;

    const { error: bucketError } = await client.storage.from("projects").remove([filePath])
    if (bucketError) {
        console.log('Error deleting in bucket: ', bucketError)
        return
    }

    const { error: updateError } = await client
        .from("project_budget")
        .update({ [col]: null })
        .eq("id", itemID);

    if (updateError) {
        console.log("Error updating DB column:", updateError);
        return;
    }

    console.log(`Deleted file and cleared ${col} for itemID: ${itemID}`);
}

export const updateBudgetStatus = async (
    budgetID: number,
    status: string,
    comment?: string | null
) => {
    if (!budgetID) {
        console.log("No budgetID provided")
        return false
    }

    // allowed statuses
    const allowed = ["for approval", "approved", "rejected", "resubmit"]
    if (!allowed.includes(status)) {
        console.log(`Invalid status: ${status}. Allowed: ${allowed.join(", ")}`)
        return false
    }

    // normalize comment: only keep it for Rejected or Resubmit
    let finalComment: string | null = null
    if (status === "Rejected" || status === "Resubmit") {
        finalComment = comment ?? null
    }

    const { error } = await client
        .from("project_budget")
        .update({
            status: status,
            comment: finalComment
        })
        .eq("id", budgetID)

    if (error) {
        console.log("Error updating budget status: ", error)
        return false
    }

    console.log(`Updated budgetID ${budgetID} to ${status} ${finalComment ? "with comment" : ""}`)
    return true
}