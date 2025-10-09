import { NextResponse } from "next/server";
import crypto from "crypto";

import client from "@/src/api/client";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader)
    return NextResponse.json({ error: "No Auth Token" }, { status: 401 });

  const { data: userData, error: userError } = await client.auth.getUser(
    authHeader
  );

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

  if(locationError) return NextResponse.json({ error: "No official of email: ", authEmail }, { status: 401 })

  const locID = Number(locationData.location)
  console.log("locID: ", locID)

  function generateAppSecretProof(token: string, appSecret: string) {
    const proof = crypto
      .createHmac("sha256", appSecret)
      .update(token)
      .digest("hex");

    return proof;
  }

  function locationChecker() {
  
    switch (locID) {
      case 1:
        return {
          PAGE_ID: process.env.FB_PAGE_ID_NAGA!,
          PAGE_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN_NAGA!,
        };
      case 2:
        return {
          PAGE_ID: process.env.FB_PAGE_ID_BULA!,
          PAGE_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN_BULA!,
        };
      case 3:
        return {
          PAGE_ID: process.env.FB_PAGE_ID_PILI!,
          PAGE_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN_PILI!,
        };
      default:
        throw new Error("Unsupported location ID");
    }
  }

  try {
    const { body } = await req.json();

    const { PAGE_ID, PAGE_TOKEN } = await locationChecker();
    const APP_SECRET = process.env.FB_PAGE_APP_SECRET!;

    const proof = generateAppSecretProof(PAGE_TOKEN, APP_SECRET);

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PAGE_ID}/feed?access_token=${PAGE_TOKEN}&appsecret_proof=${proof}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: body,
          access_token: PAGE_TOKEN,
          appsecret_proof: proof,
          published: true
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
