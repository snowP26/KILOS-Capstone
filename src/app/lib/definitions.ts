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
    authorName: string;
    authorPosition: string;
    authorRole: string;
};

// define Meeting based on ERD
export type meeting = {
    id: number;
    meeting_date: Date;
    document: string;
    host: string;
    date_posted: Date;
}

export type ordinance = {
    id: number,
    title: string,
    description: string,
    location: string,
    author: number,
    status: string,
    created_at: string
}

export type ordinance_approvals = {
    id: number,
    ordinance_id: number,
    stage: string,
    status: string,
    start_date: string,
    end_date: string,
    approver: string,
    remarks: string,
    locked: boolean,
}

export type ordinanceFiles = {
    url: string;
    name: string;
    type: string;
}

export type commFeedback = {
    id: number,
    created_at: string,
    header: string,
    body: string,
    location: number
}

export type feedbackComment = {
    id: number,
    created_at: string,
    feedback_id: number,
    author_id: number,
    content: string,
}

export type homeFeedback = {
    id: number,
    header: string,
    created_at: string,
}

export type project = {
    id: number,
    location_id: number,
    author: number,
    created_at: string,
    title: string,
    description: string,
    target_date: string,
    status: string,
    photo: string,
}