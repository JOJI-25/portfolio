"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

type ProfileFormData = {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  education: string;
  university: string;
  careerObjective: string;
  typingPhrases: string;
  resumeUrl: string;
};

export default function AdminProfilePage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.name) {
          Object.keys(data).forEach((key) => {
            setValue(key as keyof ProfileFormData, data[key]);
          });
        }
        setFetching(false);
      });
  }, [setValue]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'resumes');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setValue('resumeUrl', data.url);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    }
    setUploading(false);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    setSuccess(false);

    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (fetching) {
    return <div className="text-text-secondary animate-pulse p-12 text-center">Loading Profile Data...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Personal Info</h1>
        <p className="text-text-secondary mt-1">Manage your bio, contact details, and core identity.</p>
      </div>

      <div className="bg-bg-secondary border border-border rounded-xl p-8">
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg font-medium">
            Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <input {...register("name", { required: true })} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Job Title</label>
              <input {...register("title", { required: true })} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input type="email" {...register("email", { required: true })} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">GitHub URL</label>
              <input {...register("github")} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">LinkedIn URL</label>
              <input {...register("linkedin")} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Bio</label>
            <textarea {...register("bio")} rows={4} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Career Objective</label>
            <textarea {...register("careerObjective")} rows={2} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Typing Phrases (Comma separated)</label>
              <input {...register("typingPhrases")} placeholder="e.g. Data Scientist, AI Engineer" className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Education</label>
              <input {...register("education")} className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary focus:border-accent-primary focus:ring-1 outline-none" />
            </div>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <h3 className="text-lg font-medium text-text-primary mb-4">Resume PDF</h3>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer flex items-center px-4 py-2 bg-bg-elevated border border-border hover:border-accent-primary rounded-lg transition-colors">
                <Upload className="w-4 h-4 mr-2 text-accent-primary" />
                <span className="text-sm font-medium text-text-primary">{uploading ? 'Uploading...' : 'Upload PDF'}</span>
                <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
              <input {...register("resumeUrl")} readOnly placeholder="No file uploaded" className="flex-1 bg-transparent border-none text-text-secondary text-sm outline-none" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={loading} className="px-6 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white rounded-lg transition-colors font-medium disabled:opacity-50">
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
