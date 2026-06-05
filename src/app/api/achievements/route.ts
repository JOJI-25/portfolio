import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { achievements as defaultAchievements } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let items = await db.achievement.findMany();
    
    // Auto-seed if empty
    if (items.length === 0) {
      await db.achievement.createMany({
        data: defaultAchievements.map(a => ({
          id: a.id,
          title: a.title,
          description: a.description,
          icon: a.icon,
          status: a.status,
          level: a.level,
          progress: a.progress || 0,
          date: a.earnedDate || null
        }))
      });
      items = await db.achievement.findMany();
    }

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}
