import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const items = await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items.map((item) => ({ ...item, images: JSON.parse(item.images || "[]") })));
}

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const item = await prisma.galleryItem.create({
    data: {
      title: body.title,
      description: body.description || "",
      beforeAfter: Boolean(body.beforeAfter),
      images: JSON.stringify(body.images || []),
    },
  });

  return NextResponse.json(item, { status: 201 });
}
