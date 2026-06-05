import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
import { skills as defaultSkills } from '@/lib/data';

export async function GET() {
  try {
    let dbSkills = await db.skill.findMany();
    
    // Auto-seed if empty
    if (dbSkills.length === 0) {
      await db.skill.createMany({
        data: defaultSkills.map(s => ({
          id: s.id,
          name: s.name,
          icon: s.icon,
          status: s.status,
          progress: s.progress ?? 0,
          description: s.description,
          relatedProjects: s.relatedProjects.join(','),
          parentSkill: s.parentSkill ?? '',
          children: s.children?.join(',') ?? '',
          notes: s.notes ?? ''
        }))
      });
      dbSkills = await db.skill.findMany();
    }

    // Sort by the original intended order
    const SKILL_ORDER = [
      's-excel', 's-linux-python', 's-sql', 's-numpy-pandas', 's-stats', 
      's-dataviz', 's-ml', 's-supervised', 's-unsupervised', 's-dl', 
      's-tensorflow', 's-capstone', 's-business', 's-genai', 's-powerbi', 
      's-git', 's-mlops', 's-cloud'
    ];
    dbSkills.sort((a, b) => {
      const indexA = SKILL_ORDER.indexOf(a.id);
      const indexB = SKILL_ORDER.indexOf(b.id);
      // Fallback to 999 if not found, to put unknowns at the end
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return NextResponse.json(dbSkills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, status } = data;

    const updated = await db.skill.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}
