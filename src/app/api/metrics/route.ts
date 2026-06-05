import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const [projectCount, skillCount, certCount, dashboardCount, manualMetrics, profile] = await Promise.all([
      db.project.count(),
      db.skill.count({ where: { status: 'completed' } }),
      db.certification.count(),
      db.dashboardItem.count(),
      db.metricItem.findMany(),
      db.personalInfo.findUnique({ where: { id: "default" } }),
    ]);

    // Fetch real GitHub repository count!
    let githubRepoCount = 0;
    if (profile?.github) {
      try {
        // Extract username from URL (e.g., https://github.com/jojicg25 -> jojicg25)
        const username = profile.github.split('/').pop();
        if (username) {
          const githubRes = await fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } });
          const githubData = await githubRes.json();
          if (githubData && githubData.public_repos !== undefined) {
            githubRepoCount = githubData.public_repos;
          }
        }
      } catch (err) {
        console.error("Failed to fetch GitHub repos", err);
      }
    }

    // We generate dynamic metrics based on actual database tables
    const dynamicMetrics = [
      {
        label: "Projects Completed",
        value: projectCount,
        icon: "FolderKanban",
        suffix: "+"
      },
      {
        label: "Skills Mastered",
        value: skillCount,
        icon: "Layers",
      },
      {
        label: "Certifications Earned",
        value: certCount,
        icon: "Award",
      },
      {
        label: "GitHub Repositories",
        value: githubRepoCount,
        icon: "Github",
      },
      {
        label: "Dashboards Created",
        value: dashboardCount,
        icon: "BarChart3",
      }
    ];

    // Merge dynamic metrics with any manual metrics the user added
    const allMetrics = [...dynamicMetrics, ...manualMetrics];

    return NextResponse.json(allMetrics);
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
  }
}
