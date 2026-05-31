import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  try {
    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Old and new password required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const currentHash = process.env.ADMIN_PASSWORD_HASH;
    if (!currentHash) {
      return NextResponse.json(
        { error: "Admin account not configured" },
        { status: 500 }
      );
    }

    const valid = bcrypt.compareSync(oldPassword, currentHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Old password incorrect" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated. Please update ADMIN_PASSWORD_HASH environment variable.",
      newHash: bcrypt.hashSync(newPassword, 10),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
