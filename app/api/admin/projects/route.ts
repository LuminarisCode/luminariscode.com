import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const project = await prisma.project.create({
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
