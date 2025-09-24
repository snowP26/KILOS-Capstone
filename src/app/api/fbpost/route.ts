import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  function generateAppSecretProof(token: string, appSecret: string) {

    
    const proof = crypto
      .createHmac("sha256", appSecret)
      .update(token)
      .digest("hex");

    console.log("✅ Generated appsecret_proof:", proof);

    return proof;
  }

  try {
    const { message } = await req.json();

    const PAGE_ID = process.env.FB_PAGE_ID_BULA!;
    const PAGE_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN_BULA!;
    const APP_SECRET = process.env.FB_PAGE_APP_SECRET!;

    // Generate and log proof
    const proof = generateAppSecretProof(PAGE_TOKEN, APP_SECRET);

    console.log("➡️ Posting to Facebook with appsecret_proof:", proof);

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PAGE_ID}/feed?access_token=${PAGE_TOKEN}&appsecret_proof=${proof}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          // ⚠️ not needed in body since it's already in querystring
          // keeping only for debug clarity
          access_token: PAGE_TOKEN,
          appsecret_proof: proof,
        }),
      }
    );

    const data = await res.json();

    console.log("⬅️ Facebook API response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error in POST handler:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
