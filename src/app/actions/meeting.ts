import client from "@/src/api/client";
import Swal from "sweetalert2";
import { getUserID, yoEmailtoID } from "./convert";

export const updateAttendees = async (emails: string[], meetingID: number) => {
    const authUser = await getUserID();

    const { data: existingEmails, error: yoError } = await client
        .from("youth_official")
        .select("id, email")
        .in("email", emails)

    if (yoError) {
        Swal.fire({
            icon: "error",
            title: "Database Error",
            text: "An error occurred while verifying user emails.",
            timer: 1150,
        });
        console.error(yoError);
        return;
    }

    const verified = existingEmails.map((email) => email.email)
    const unverified = emails.filter((email) => !verified.includes(email))

    const validIDs = await Promise.all(
        verified.map(async (email) => await yoEmailtoID(email))
    );

    const filteredIDs = validIDs.filter((id) => id !== null);


    if (!filteredIDs.includes(authUser)) {
        filteredIDs.push(authUser);
    }


    if (unverified.length > 0) {
        Swal.fire({
            icon: "warning",
            title: "Unverified Participants",
            html: `
                <p>The following users are not registered in KILOS:</p>
                <ul style="text-align:left; margin-top:8px;">
                    ${unverified.map((email) => `<li>${email}</li>`).join("")}
                </ul>
                <p class="mt-2">They were not added to the meeting.</p>
                `,
            confirmButtonText: "OK",
            timer: 1250,
            showConfirmButton: false,
        });

    }
    if (verified.length >= 1) {
        const participants = filteredIDs.map((official_id) => ({
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
            text: `${verified.length} verified participants were successfully added to the meeting.`,
            timer: 1250,
            showConfirmButton: false,
        });
    }
}

export const getMeeting = async () => {
    const authUser = await getUserID();

    const { data: participantsData, error: participantsError } = await client
        .from("meeting_participants")
        .select("*")
        .eq("official_id", authUser);

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
            .single();

        if (conversionError) {
            await Swal.fire({
                icon: "error",
                title: "Error Fetching Meeting",
                text: conversionError.message || `Failed to load meeting ${data.meeting_id}.`,
            });
            return null;
        }

        if (!conversionData) return null;

        return conversionData;
    });

    const meetings = await Promise.all(fetchMeeting);
    console.log(meetings)
    return meetings;
};
