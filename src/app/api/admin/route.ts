import { NextRequest, NextResponse } from "next/server";
import { saveConfig } from "@/lib/db";

const ADMIN_USERNAME_HASH =
  "c46886b0b472784a6c50bb94f5f5aa091b41b65c7ec2eb5461f44e60796f4479";
const ADMIN_PASSWORD_HASH =
  "091131ec9c517689297ba809b94c38a82562287421a06201f45942e229d61907";

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
      const tokenHash = await sha256(token);
      if (tokenHash !== ADMIN_USERNAME_HASH + ADMIN_PASSWORD_HASH) {
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
