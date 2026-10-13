import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const service = await prisma.service.update({
    where: { id: params.id },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });

  return NextResponse.json(service);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
