import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  return { username, passwordHash };
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 }
      );
    }

    const admin = getAdminCredentials();
    if (!admin.passwordHash) {
      return NextResponse.json(
        { error: "Admin account not configured" },
        { status: 500 }
      );
    }

    if (username !== admin.username) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = bcrypt.compareSync(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ username: admin.username }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return NextResponse.json({ token, username: admin.username });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
