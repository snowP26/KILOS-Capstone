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

type ApprovalStatus = "in progress" | "pending" | "approved" | "vetoed";
    
type readingData = {
    status: ApprovalStatus,
    approver: string | null,
    "start-date": string,
    "end-date": string,
    remarks: string,
}

export const locations = ["naga-city", "pili", "bula"] as const;

export type ordinance = {
    id: number,
    title: string,
    description: string,
    location: string,
    approvals:  {
        "First Reading": readingData;
        "Second Reading": readingData;
        "Third Reading": readingData;
    },
    author: number,
}

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


// define Announcement based on ERD
export type announcement = {
    id: number;
    created_at: Date;
    header: string;
    body: string;
    ispinned: boolean;
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

export type ordinanceFiles = {
    id: number,
    created_at: Date,
    ordinance_id: number,
    file_path: string,
    file_name: string,
    author_id: number
}

export type commFeedback = {
    id: number,
    created_at: Date,
    header: string,
    body: string,
    location: number
}