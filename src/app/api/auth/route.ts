import { NextRequest, NextResponse } from "next/server";

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
    const { username, password } = await request.json();
    const usernameHash = await sha256(username);
    const passwordHash = await sha256(password);

    if (
      usernameHash === ADMIN_USERNAME_HASH &&
      passwordHash === ADMIN_PASSWORD_HASH
    ) {
      const token = ADMIN_USERNAME_HASH + ADMIN_PASSWORD_HASH;
      return NextResponse.json({ token });
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
