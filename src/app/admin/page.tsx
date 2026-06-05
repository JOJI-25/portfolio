import { db } from "@/lib/db";
import { FolderKanban, Star, Award } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch high-level stats from our database
  const projectCount = await db.project.count();
  const skillCount = await db.skill.count();
  const certCount = await db.certification.count();

  const stats = [
    { title: "Total Projects", value: projectCount, icon: FolderKanban, color: "text-blue-500", bg: "bg-blue-500/10", href: "/admin/projects" },
    { title: "Total Skills", value: skillCount, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10", href: "/admin/skills" },
    { title: "Certifications", value: certCount, icon: Award, color: "text-green-500", bg: "bg-green-500/10", href: "/admin/certifications" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard Overview</h1>
        <p className="text-text-secondary mt-2">Welcome back! Here is a summary of your portfolio content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-accent-primary transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
                  <p className="text-4xl font-bold text-text-primary mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Manage {stat.title.split(" ")[1]} →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-text-primary mb-6">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link href="/admin/projects/new" className="px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-colors">
            + New Project
          </Link>
          <Link href="/admin/skills/new" className="px-6 py-3 bg-bg-secondary border border-border hover:border-accent-primary text-text-primary font-medium rounded-lg transition-colors">
            + New Skill
          </Link>
        </div>
      </div>
    </div>
  );
}
