import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const data = await prisma.design.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        height: true,
        width: true,
        image: true,
        facing: true,
        isActive: true
      },
      orderBy: {
        id: "desc"
      }
    });
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("DESIGN FETCH ERROR:", error);
    return NextResponse.json(
      { message: "Design fetch failed" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const width = Number(formData.get("width"));
    const height = Number(formData.get("height"));
    const facing = formData.get("facing") as string;
    const isActive = formData.get("isActive") === "true";
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    /* ================= SAVE IMAGE ================= */
    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `${Date.now()}-${image.name}`;
    const uploadDir = path.join(process.cwd(), "public/designs");

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const imagePath = `/designs/${fileName}`;

    /* ================= SAVE DB ================= */
    await prisma.design.create({
      data: {
        title,
        description,
        width: Number(width),
        height: Number(height),
        facing,
        isActive,
        image: imagePath,
        crby: 1
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CREATE DESIGN ERROR:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
