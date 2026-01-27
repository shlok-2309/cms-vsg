import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const year_of_experience = formData.get("year_of_experience") as string;
    const careerId = Number(formData.get("careerId"));
    const resume = formData.get("resume") as File;

    if (!resume || !careerId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ======================
       Fetch Job Title
    ======================= */
    const career = await prisma.career.findUnique({
      where: { id: careerId },
      select: { job_Title: true },
    });

    if (!career) {
      return NextResponse.json(
        { message: "Career not found" },
        { status: 404 }
      );
    }

    /* ======================
       Save Resume File
    ======================= */
    const bytes = await resume.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${resume.name}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    /* ======================
       Prisma Insert
    ======================= */
    await prisma.appliedJobs.create({
      data: {
        name,
        email,
        phone,
        resume: `/uploads/${fileName}`,
        job_Title: career.job_Title,
        year_of_experience,
        careerId,
      },
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
