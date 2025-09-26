import { NextResponse } from "next/server";
import crypto from "crypto";
import client from "@/src/api/client";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader)
      return NextResponse.json({ error: "No Auth Token" }, { status: 401 });

    const { data: userData, error: userError } = await client.auth.getUser(authHeader);
    if (userError || !userData) {
      return NextResponse.json(
        { error: "Invalid or missing session" },
        { status: 401 }
      );
    }

    const authEmail = userData.user.email;

    const { data: locationData, error: locationError } = await client
      .from("youth_official")
      .select("location")
      .eq("email", authEmail)
      .single();

    if (locationError || !locationData) {
      return NextResponse.json(
        { error: `No official found with email: ${authEmail}` },
        { status: 401 }
      );
    }

    const locID = Number(locationData.location);

    let PAGE_ID: string, PAGE_TOKEN: string;
    switch (locID) {
      case 1:
        PAGE_ID = process.env.FB_PAGE_ID_NAGA!;
        PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN_NAGA!;
        break;
      case 2:
        PAGE_ID = process.env.FB_PAGE_ID_BULA!;
        PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN_BULA!;
        break;
      case 3:
        PAGE_ID = process.env.FB_PAGE_ID_PILI!;
        PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN_PILI!;
        break;
      default:
        return NextResponse.json({ error: "Unsupported location ID" }, { status: 400 });
    }

    const APP_SECRET = process.env.FB_PAGE_APP_SECRET!;
    const proof = crypto
      .createHmac("sha256", APP_SECRET)
      .update(PAGE_TOKEN)
      .digest("hex");

    // Fetch posts from the page
    const fbRes = await fetch(
      `https://graph.facebook.com/v21.0/${PAGE_ID}/posts?access_token=${PAGE_TOKEN}&appsecret_proof=${proof}`
    );

    const data = await fbRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Facebook posts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
