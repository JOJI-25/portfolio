import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary mt-1">Manage your portfolio projects here.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Link>
      </div>

      <div className="bg-bg-secondary border border-border rounded-xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">
            <p>No projects found. Click "Add Project" to create your first one!</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-elevated text-sm text-text-secondary">
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-bg-elevated transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden mr-4 border border-border">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{project.title}</p>
                        <p className="text-sm text-text-secondary truncate w-48">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs rounded-full border border-accent-primary/20">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {project.date || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-text-secondary hover:text-accent-primary hover:bg-accent-primary/10 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
