import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const profile = await db.personalInfo.findUnique({ where: { id: "default" } });
    if (!profile?.github) return NextResponse.json({ repos: [], languageDistribution: [], username: null });

    const username = profile.github.split('/').pop();
    if (!username) return NextResponse.json({ repos: [], languageDistribution: [], username: null });

    // GitHub requires a User-Agent header
    const headers = { "User-Agent": "Portfolio-App" };

    // Fetch top 3 recently updated repos
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, { 
      headers,
      next: { revalidate: 3600 } 
    });
    
    if (!repoRes.ok) {
      console.warn("GitHub API error for repos:", repoRes.statusText);
      return NextResponse.json({ repos: [], languageDistribution: [], username });
    }
    
    const reposData = await repoRes.json();
    
    const repos = reposData.map((repo: any) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      language: repo.language || "Other",
      stars: repo.stargazers_count,
      url: repo.html_url,
      updatedAt: repo.updated_at,
    }));

    // For language distribution, fetch all repos to calculate
    const allRepoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { 
      headers,
      next: { revalidate: 3600 } 
    });
    
    const allReposData = allRepoRes.ok ? await allRepoRes.json() : [];
    
    const langCounts: Record<string, number> = {};
    let total = 0;
    
    if (Array.isArray(allReposData)) {
      allReposData.forEach((repo: any) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          total++;
        }
      });
    }

    const languageDistribution = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);

    return NextResponse.json({ repos, languageDistribution, username });
  } catch (error) {
    console.error("GitHub API Error", error);
    return NextResponse.json({ repos: [], languageDistribution: [], username: null, error: true }, { status: 500 });
  }
}
