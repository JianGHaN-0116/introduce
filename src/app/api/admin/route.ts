import { NextRequest, NextResponse } from "next/server";
import { saveConfig } from "@/lib/db";

const ADMIN_USERNAME_HASH =
  "2e4cc37a5b389b8081c8259afac20c6fc0c8e931785febbc300df264d164b288";
const ADMIN_PASSWORD_HASH =
  "0416662d97d328d5c6623962e8891a6b7af15955ba0a14c743ea5c01f8b95b99";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, config } = body;

    if (username && password) {
      const usernameHash = await sha256(username);
      const passwordHash = await sha256(password);
      if (
        usernameHash !== ADMIN_USERNAME_HASH ||
        passwordHash !== ADMIN_PASSWORD_HASH
      ) {
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const token = authHeader.slice(7);
      if (token !== ADMIN_USERNAME_HASH + ADMIN_PASSWORD_HASH) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (!config) {
      return NextResponse.json(
        { error: "Config is required" },
        { status: 400 }
      );
    }

    await saveConfig(config);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("[Admin API Error]", e);
    return NextResponse.json(
      { error: e.message || "Unknown error", stack: e.stack },
      { status: 500 }
    );
  }
}
