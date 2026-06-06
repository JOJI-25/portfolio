import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const profile = await db.personalInfo.findUnique({
      where: { id: "default" }
    });
    
    // Return empty defaults if not found
    if (!profile) {
      return NextResponse.json({});
    }
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Upsert ensures we create it if it doesn't exist, or update if it does
    const profile = await db.personalInfo.upsert({
      where: { id: "default" },
      update: {
        name: body.name || "",
        title: body.title || "",
        email: body.email || "",
        github: body.github || "",
        linkedin: body.linkedin || "",
        bio: body.bio || "",
        education: body.education || "",
        university: body.university || "",
        careerObjective: body.careerObjective || "",
        typingPhrases: body.typingPhrases || "",
        resumeUrl: body.resumeUrl || null,
      },
      create: {
        id: "default",
        name: body.name || "",
        title: body.title || "",
        email: body.email || "",
        github: body.github || "",
        linkedin: body.linkedin || "",
        bio: body.bio || "",
        education: body.education || "",
        university: body.university || "",
        careerObjective: body.careerObjective || "",
        typingPhrases: body.typingPhrases || "",
        resumeUrl: body.resumeUrl || null,
      }
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
