import { NextRequest, NextResponse } from "next/server";

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
