import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.contact.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("CONTACT FETCH ERROR:", error);

    return NextResponse.json(
      { message: "Database fetch failed" },
      { status: 500 }
    );
  }
}
