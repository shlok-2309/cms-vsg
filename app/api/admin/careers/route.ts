import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const careers = await prisma.career.findMany({
    orderBy: { createdDate: "desc" },
  });

  return NextResponse.json(careers, { status: 200 });
}
