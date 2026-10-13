import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const service = await prisma.service.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price || "Pris efter behov",
      active: true,
    },
  });

  return NextResponse.json(service, { status: 201 });
}
