import { NextResponse } from "next/server";
import { getLocFromAuth } from "../../actions/convert";
import crypto from "crypto";

function locationChecker(locID: number) {
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

function generateAppSecretProof(token: string, appSecret: string) {
  return crypto.createHmac("sha256", appSecret).update(token).digest("hex");
}

export const DELETE = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No Auth token" }, { status: 401 });
    }
    const body = await req.json().catch(() => null);
    if (!body || !body.postID) {
      return NextResponse.json(
        { error: "postID is required" },
        { status: 400 }
      );
    }

    const { postID } = body;

    const locationID = await getLocFromAuth(authHeader);

    const { PAGE_TOKEN } = locationChecker(locationID);
    const APP_SECRET = process.env.FB_PAGE_APP_SECRET!;
    const proof = generateAppSecretProof(PAGE_TOKEN, APP_SECRET);

    const res = await fetch(
      `https://graph.facebook.com/v23.0/${postID}?access_token=${PAGE_TOKEN}&appsecret_proof=${proof}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: "Facebook delete failed", details: err },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, fb: data });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};
