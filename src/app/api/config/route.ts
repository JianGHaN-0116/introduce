import { NextResponse } from "next/server";
import { getConfig } from "@/lib/db";

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config || {});
  } catch (e: any) {
    console.error("[API /config]", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
