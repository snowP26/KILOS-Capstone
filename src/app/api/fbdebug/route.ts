import { NextResponse } from "next/server";

export async function GET() {
    try {
        const APP_ID = process.env.FB_APP_ID!;
        const APP_SECRET = process.env.FB_PAGE_APP_SECRET!;
        const PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN!;

        // App Access Token format: {app-id}|{app-secret}
        const APP_ACCESS_TOKEN = `${APP_ID}|${APP_SECRET}`;

        const res = await fetch(
            `https://graph.facebook.com/debug_token?input_token=${PAGE_TOKEN}&access_token=${APP_ACCESS_TOKEN}`
        );

        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("❌ Error in /api/fbdebug:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
