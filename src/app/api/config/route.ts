import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/kv";

export async function GET() {
  const config = await getConfig();
  return NextResponse.json(config);
}
