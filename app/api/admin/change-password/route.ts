import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { currentPassword, newPassword } = await req.json();

    const getCookie = await cookies();
    const token = getCookie.get("admin_token")?.value;
    if (!token) return NextResponse.json({}, { status: 401 });

    const decoded: any = jwt.verify(token, JWT_SECRET);

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!admin) return NextResponse.json({}, { status: 404 });

    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match)
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
