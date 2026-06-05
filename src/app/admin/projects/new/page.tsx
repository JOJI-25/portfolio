"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ProjectFormData = {
  title: string;
  category: string;
  technologies: string;
  description: string;
  githubUrl?: string;
  featured: boolean;
};

export default function NewProjectPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save project");
      
      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setError("An error occurred while saving the project.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/projects" className="p-2 hover:bg-bg-elevated rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Create New Project</h1>
          <p className="text-sm text-text-secondary">Add a new data science project to your portfolio</p>
        </div>
      </div>

      <div className="bg-bg-secondary border border-border rounded-xl p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Project Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition"
              />
              {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition"
              >
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Analysis">Data Analysis</option>
                <option value="Deep Learning">Deep Learning</option>
                <option value="NLP">NLP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Technologies Used (Comma separated)</label>
            <input
              {...register("technologies", { required: "At least one technology is required" })}
              placeholder="e.g. Python, TensorFlow, Pandas"
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">GitHub URL (Optional)</label>
            <input
              {...register("githubUrl")}
              placeholder="https://github.com/..."
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Short Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={3}
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition resize-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              className="w-4 h-4 rounded border-border text-accent-primary focus:ring-accent-primary bg-bg-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-text-secondary">
              Feature this project on the homepage
            </label>
          </div>

          <div className="pt-4 flex justify-end space-x-4 border-t border-border">
            <Link
              href="/admin/projects"
              className="px-6 py-2 border border-border hover:bg-bg-elevated text-text-primary rounded-lg transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
