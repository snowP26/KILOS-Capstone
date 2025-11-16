import client from "@/src/api/client";
import Swal from "sweetalert2";
import { getLocFromAuth, getUserID, yoEmailtoID } from "./convert";

export const updateAttendees = async (participantsID: number[], meetingID: number) => {
    const authUser = await getUserID();

    if (!participantsID.includes(Number(authUser))) {
        participantsID.push(Number(authUser));
    }

    const participants = participantsID.map((official_id) => ({
        meeting_id: meetingID,
        official_id,
    }));
    const { error: joinError } = await client
        .from("meeting_participants")
        .insert(participants)

    if (joinError) {
        Swal.fire({
            icon: "error",
            title: "Failed to Add Attendees",
            text: "An error occurred while adding verified participants.",
            timer: 1150,
        });
        console.error(joinError);
        return;
    }
    Swal.fire({
        icon: "success",
        title: "Attendees Added",
        text: `${participants.length} verified participants were successfully added to the meeting.`,
        timer: 1250,
        showConfirmButton: false,
    });

}

export const getMeeting = async () => {
    const authUser = await getUserID();


    const { data: participantsData, error: participantsError } = await client
        .from("meeting_participants")
        .select("*")
        .eq("official_id", authUser)


    if (participantsError) {
        await Swal.fire({
            icon: "error",
            title: "Error Fetching Participants",
            text: participantsError.message || "Something went wrong fetching participants.",
        });
        return null;
    }

    if (!participantsData) return null;

    const fetchMeeting = participantsData.map(async (data) => {
        const { data: conversionData, error: conversionError } = await client
            .from("meetings")
            .select("*, users:host_id (firstname, lastname)")
            .eq("id", data.meeting_id)
            .single()


        if (conversionError) {
            await Swal.fire({
                icon: "error",
                title: "Error Fetching Meeting",
                text: conversionError.message || `Failed to load meeting ${data.meeting_id}.`,
            });
            return null;
        }

        if (!conversionData) return null;
        const now = (new Date()).toISOString();
        const meetingDate = new Date(conversionData.date).toISOString()

        console.log(meetingDate < now)

        if (meetingDate < now) {
            console.log("Deleting past meeting:", conversionData.id);

            const { error: deleteError } = await client
                .from("meetings")
                .delete()
                .eq("id", conversionData.id);

            if (deleteError) {
                await Swal.fire({
                    icon: "error",
                    title: "Failed to Delete Past Meeting",
                    text: deleteError.message || `Could not delete meeting ${conversionData.id}.`,
                });
                return null;
            }

            return null;
        }

        return conversionData;
    });

    const meetings = await Promise.all(fetchMeeting);
    
    return meetings;
};

export const getParticipantsByLoc = async () => {
    const loc = await getLocFromAuth();

    const { data, error } = await client
        .from("youth_official")
        .select("id, firstname, lastname, email, role, position")
        .eq("location", loc);

    if (error) {
        Swal.fire({
            icon: "error",
            title: "Failed to Load Participants",
            text: error.message || "Something went wrong while fetching participants.",
        });
        return null;
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data;
};