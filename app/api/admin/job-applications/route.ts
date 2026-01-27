import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const applications = await prisma.appliedJobs.findMany({
      orderBy: {
        createdDate: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
