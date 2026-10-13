import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const booking = await prisma.booking.update({
    where: { id: params.id },
    data: {
      status: body.status || "pending",
      notes: body.notes ?? undefined,
    },
  });

  return NextResponse.json(booking);
}
