import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all projects
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app we'd validate the body with Zod here
    const project = await db.project.create({
      data: {
        title: body.title,
        description: body.description,
        longDescription: body.longDescription || null,
        category: body.category,
        technologies: body.technologies, // Comma separated string
        thumbnail: body.thumbnail || "/images/projects/placeholder.jpg",
        images: body.images || "[]",
        githubUrl: body.githubUrl || null,
        featured: body.featured || false,
        date: body.date || null,
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
