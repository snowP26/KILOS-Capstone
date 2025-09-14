import { getLocFromAuth } from "@/src/app/actions/convert";
import client from "../../client";

type FbPostResponse = {
    success?: boolean;
    fbPostId?: string;
    error?: string;
};

export async function POST() {
  const loc = await getLocFromAuth();
  const pageMap: Record<number, { id?: string; token?: string }> = {
      1: { id: process.env.FB_PAGE_ID_NAGA!, token: process.env.FB_PAGE_ACCESS_TOKEN },
      2: { id: process.env.FB_PAGE_ID_BULA, token: process.env.FB_PAGE_TOKEN },
      3: { id: process.env.FB_PAGE_ID_PILI, token: process.env.FB_PAGE_TOKEN},
  };
  
// need pa tapusin
}
