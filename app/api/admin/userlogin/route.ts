import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });


  // const pass = await bcrypt.hash("admin@123", 10)
  // console.log("password", pass);


  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid)
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return res;
}
