import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import fs from "fs";
import path from "path";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // NEXT 16 FIX
    const designId = Number(id);

    if (!designId) {
      return NextResponse.json(
        { message: "Invalid ID" },
        { status: 400 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const width = Number(formData.get("width"));
    const height = Number(formData.get("height"));
    const facing = formData.get("facing") as string;
    const isActive = formData.get("isActive") === "true";
    const existingImage = formData.get("existingImage") as string;
    const image = formData.get("image") as File | null;

    let imagePath = existingImage;

    /* ===== IMAGE HANDLING ===== */
    if (image && image.size > 0) {
      // delete old image
      if (existingImage) {
        const oldPath = path.join(process.cwd(), "public", existingImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const uploadDir = path.join(process.cwd(), "public/designs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      const savePath = path.join(uploadDir, fileName);

      fs.writeFileSync(savePath, buffer);
      imagePath = `/designs/${fileName}`;
    }

    /* ===== DB UPDATE ===== */
    await prisma.design.update({
      where: { id: designId },
      data: {
        title,
        description,
        width,
        height,
        facing,
        isActive,
        image: imagePath,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE DESIGN ERROR:", error);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
