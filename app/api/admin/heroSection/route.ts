import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const data = await prisma.hero_Section.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      isActive: true,
    },
    orderBy: {
      id: "asc"
    }
  });

  return NextResponse.json(data, { status: 200 });
}

// Update code

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const isActive = formData.get("isActive") === "true";
    const image = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // 1️⃣ Get existing record
    const existing = await prisma.hero_Section.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    let imagePath = existing.image; // default = old image

    // 2️⃣ If new image selected
    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "images");

      // delete old image
      if (existing.image) {
        const oldPath = path.join(process.cwd(), "public", existing.image);
        try {
          await fs.unlink(oldPath);
        } catch {
          // ignore if file doesn't exist
        }
      }

      // save new image with ORIGINAL filename
      const fileName = image.name;
      const fullPath = path.join(uploadDir, fileName);

      const buffer = Buffer.from(await image.arrayBuffer());
      await fs.writeFile(fullPath, buffer);

      imagePath = `/images/${fileName}`;
    }

    // 3️⃣ Update DB
    await prisma.hero_Section.update({
      where: { id },
      data: {
        title,
        description,
        isActive,
        image: imagePath, // updated only if image changed
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}