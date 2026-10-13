import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slots = await prisma.availabilitySlot.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json(slots);
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slot = await prisma.availabilitySlot.create({
    data: {
      date: body.date,
      startTime: body.startTime,
      endTime: body.endTime,
      reason: body.reason || "Upptagen tid",
      isBooked: Boolean(body.isBooked),
    },
  });

  return NextResponse.json(slot, { status: 201 });
}
