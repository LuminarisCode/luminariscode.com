import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const project = await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      categoryEn: data.categoryEn,
      categoryId: data.categoryId,
      descriptionEn: data.descriptionEn,
      descriptionId: data.descriptionId,
      image: data.image || null,
      gradient: data.gradient || "from-indigo-500 to-purple-600",
      technologies: data.technologies || [],
      status: data.status || "Active",
      demoUrl: data.demoUrl || null,
      order: data.order || 0,
      published: data.published ?? true,
    },
  });
  return NextResponse.json(project);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
