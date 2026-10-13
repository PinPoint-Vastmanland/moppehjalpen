import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.phone || !body.email || !body.brandModel || !body.description || !body.serviceId || !body.preferredDate || !body.preferredTime) {
    return NextResponse.json({ error: "Fyll i alla obligatoriska fält." }, { status: 400 });
  }

  if (!body.termsAccepted) {
    return NextResponse.json({ error: "Du måste godkänna bokningsvillkoren." }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      name: String(body.name),
      phone: String(body.phone),
      email: String(body.email),
      brandModel: String(body.brandModel),
      modelYear: body.modelYear ? String(body.modelYear) : null,
      serviceId: String(body.serviceId),
      description: String(body.description),
      preferredDate: String(body.preferredDate),
      preferredTime: String(body.preferredTime),
      attachments: JSON.stringify(body.attachments || []),
      status: "pending",
      termsAccepted: true,
      termsAcceptedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, booking }, { status: 201 });
}
