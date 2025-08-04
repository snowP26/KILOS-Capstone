import { UUID } from "crypto";


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
    date: Date;
    header: string;
    body: string;
    photo: string[]; // string = url to photo.
    author: string;
};

// define Meeting based on ERD
export type meeting = {
    id: number;
    meeting_date: Date;
    document: string;
    host: string;
    date_posted: Date;
}
