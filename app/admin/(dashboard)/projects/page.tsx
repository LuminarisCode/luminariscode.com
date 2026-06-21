import { prisma } from "@/lib/prisma";
import ProjectsClient from "./_components/ProjectsClient";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return <ProjectsClient initialData={projects} />;
}
