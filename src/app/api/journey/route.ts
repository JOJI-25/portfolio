import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
import { journeyItems as defaultJourney } from '@/lib/data';

export async function GET() {
  try {
    let items = await db.journeyItem.findMany();
    
    // Auto-seed if empty
    if (items.length === 0) {
      await db.journeyItem.createMany({
        data: defaultJourney.map(j => ({
          id: j.id,
          title: j.title,
          role: j.role,
          company: j.company,
          date: j.date,
          skill: j.skill,
          icon: j.icon,
          status: j.status,
          description: j.description,
          type: j.type,
          skills: j.skills.join(',')
        }))
      });
      items = await db.journeyItem.findMany();
    }

    // Sort items by matching their title to the default intended order
    const defaultOrder = defaultJourney.map(j => j.title.toLowerCase());
    
    items.sort((a, b) => {
      const indexA = defaultOrder.indexOf(a.title.toLowerCase());
      const indexB = defaultOrder.indexOf(b.title.toLowerCase());
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // Fallback to createdAt for entirely custom items
      return a.createdAt.getTime() - b.createdAt.getTime();
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch journey items' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, status } = data;

    const updated = await db.journeyItem.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update journey item' }, { status: 500 });
  }
}
