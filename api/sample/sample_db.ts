import supabase from "@/backend/utils/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase.from('sample').select('*');

    if(error) {
        return NextResponse.json({ error: error.message }, {status: 500})
    }

    return NextResponse.json({ data }, {status: 200});
}
