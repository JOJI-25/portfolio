"use client";

import { useState, useEffect } from "react";
import type { Skill, JourneyItem } from "@/types";

export default function RoadmapAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/skills").then(r => r.json()),
      fetch("/api/journey").then(r => r.json())
    ]).then(([sData, jData]) => {
      setSkills(sData);
      setJourneyItems(jData);
      setLoading(false);
    });
  }, []);

  const updateSkillStatus = async (id: string, status: string) => {
    setSaving(true);
    await fetch("/api/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    setSkills(skills.map(s => s.id === id ? { ...s, status: status as Skill["status"] } : s));
    setSaving(false);
  };

  const updateJourneyStatus = async (id: string, status: string) => {
    setSaving(true);
    await fetch("/api/journey", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    setJourneyItems(journeyItems.map(j => j.id === id ? { ...j, status: status as JourneyItem["status"] } : j));
    setSaving(false);
  };

  if (loading) {
    return <div className="text-text-secondary animate-pulse p-12 text-center">Loading Roadmap...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Curriculum Roadmap</h1>
        <p className="text-text-secondary mt-1">Manage the lock/unlock states of your curriculum progression.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Roadmap */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
           <h2 className="text-xl font-semibold mb-6">Skills Roadmap (Tree View)</h2>
           <div className="space-y-3">
             {skills.map(skill => (
               <div key={skill.id} className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-border">
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{skill.icon}</span>
                   <div>
                     <p className="font-medium text-text-primary">{skill.name}</p>
                     <p className="text-xs text-text-muted truncate w-32 sm:w-48">{skill.description}</p>
                   </div>
                 </div>
                 <select 
                   value={skill.status}
                   onChange={(e) => updateSkillStatus(skill.id, e.target.value)}
                   disabled={saving}
                   className="bg-bg-elevated border border-border rounded-md px-2 py-1.5 text-sm text-text-primary outline-none focus:border-accent-primary"
                 >
                   <option value="upcoming">🔒 Locked</option>
                   <option value="learning">🔄 Learning</option>
                   <option value="completed">✓ Completed</option>
                 </select>
               </div>
             ))}
           </div>
        </div>

        {/* Learning Journey */}
        <div className="bg-bg-secondary border border-border rounded-xl p-6">
           <h2 className="text-xl font-semibold mb-6">Learning Journey (Timeline)</h2>
           <div className="space-y-3">
             {journeyItems.map(item => (
               <div key={item.id} className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-border">
                 <div className="flex items-center gap-3">
                   <span className="text-2xl">{item.icon}</span>
                   <div>
                     <p className="font-medium text-text-primary">{item.skill}</p>
                     <p className="text-xs text-text-muted truncate w-32 sm:w-48">{item.title}</p>
                   </div>
                 </div>
                 <select 
                   value={item.status}
                   onChange={(e) => updateJourneyStatus(item.id, e.target.value)}
                   disabled={saving}
                   className="bg-bg-elevated border border-border rounded-md px-2 py-1.5 text-sm text-text-primary outline-none focus:border-accent-primary"
                 >
                   <option value="upcoming">🔒 Locked</option>
                   <option value="learning">🔄 Learning</option>
                   <option value="completed">✓ Completed</option>
                 </select>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
