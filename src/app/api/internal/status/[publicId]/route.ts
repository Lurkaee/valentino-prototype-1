import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ publicId: string }>;
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { publicId } = await params;

  const experience = await db.experience.findUnique({
    where: { publicId },
    select: { status: true },
  });

  if (!experience) {
    return NextResponse.json({ status: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json(
    { status: experience.status },
    { headers: { "Cache-Control": "no-store" } }
  );
}
