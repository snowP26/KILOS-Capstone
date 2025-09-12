import { getLocFromAuth } from "@/src/app/actions/convert";
import client from "../../client";

type FbPostResponse = {
    success?: boolean;
    fbPostId?: string;
    error?: string;
};

export async function POST(req: Request): Promise<Response> {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const message = formData.get("message") as string | null;

        if (!file) {
            return Response.json({ error: "No file uploaded" } as FbPostResponse, {
                status: 400,
            });
        }

        // Step 1: Determine which page
        const loc = await getLocFromAuth();
        const pageMap: Record<number, { id?: string; token?: string }> = {
            1: { id: process.env.FB_PAGE_ID_NAGA!, token: process.env.FB_PAGE_ACCESS_TOKEN! },
            2: { id: process.env.FB_PAGE_ID_BULA!, token: process.env.FB_PAGE_TOKEN! },
            3: { id: process.env.FB_PAGE_ID_PILI!, token: process.env.FB_PAGE_TOKEN!},
        };

        const pageConfig = pageMap[loc];
        if (!pageConfig?.id || !pageConfig?.token) {
            return Response.json(
                { error: `No Page configured for location ${loc}` } as FbPostResponse,
                { status: 400 }
            );
        }

        // Step 2: Upload file to Supabase storage
        const filePath = `${Date.now()}-${file.name}`;
        const { data, error } = await client.storage
            .from("fb_temp")
            .upload(filePath, file);

        if (error || !data) {
            return Response.json(
                { error: error?.message || "Upload failed" } as FbPostResponse,
                { status: 500 }
            );
        }

        // Step 3: Get public URL
        const { data: publicData } = client.storage
            .from("fb_temp")
            .getPublicUrl(filePath);
        const publicUrl = publicData.publicUrl;

        // Step 4: Upload to Facebook
        const fbRes = await fetch(
            `https://graph.facebook.com/v20.0/${pageConfig.id}/photos`,
            {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    url: publicUrl,
                    caption: message ?? "",
                    access_token: pageConfig.token,
                }),
            }
        );

        const fbData = await fbRes.json();
        if (!fbRes.ok) {
            return Response.json(
                { error: JSON.stringify(fbData) } as FbPostResponse,
                { status: 500 }
            );
        }

        // Step 5: Clean up temp storage
        await client.storage.from("fb_temp").remove([filePath]);

        return Response.json({ success: true, fbPostId: fbData.id } as FbPostResponse);
    } catch (err) {
        const errorMessage =
            err instanceof Error ? err.message : "Unknown server error";
        return Response.json({ error: errorMessage } as FbPostResponse, {
            status: 500,
        });
    }
}
