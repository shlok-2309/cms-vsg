import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET() {
  try {
    const cookie = await cookies()
    const token = cookie.get("admin_token")?.value;
    if (!token) return NextResponse.json({}, { status: 401 });

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { name: true, email: true },
    });

    return NextResponse.json(admin);
  } catch {
    return NextResponse.json({}, { status: 401 });
  }
}


export async function PUT(req: Request) {
  try {
    // 1️⃣ Read cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
    };

    // 3️⃣ Get body
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email required" },
        { status: 400 }
      );
    }

    // 4️⃣ Update only logged-in user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: { name, email },
      select: {
        name: true,
        email: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}