import { UUID } from "crypto";

type AnnouncementType =
    | "General"
    | "Policy"
    | "Public Service"
    | "Administrative"
    | "Electoral"
    | "Event"
    | "Emergency"
    | "Financial"
    | "Employment"
    | "Infrastructure"
    | "Press Release";

export type u = {
    id: number;
    name: string;
    author_id: UUID;
}

// define users(youth officials) based on ERD
export type users = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    regCode: string;
    // position_id: number;
}

// export type admin = {

// }

// define Announcement based on ERD
export type announcement = {
    id: number;
    created_at: Date;
    header: string;
    body: string;

    type: AnnouncementType;
    photo: string; // string = url to photo.
    author_email: string;

};

// define Meeting based on ERD
export type meeting = {
    id: number;
    meeting_date: Date;
    document: string;
    host: string;
    date_posted: Date;
}
