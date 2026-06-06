import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { certifications as defaultCertifications } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let items = await db.certification.findMany();
    

    // Format skills back to array from comma-separated string
    const formatted = items.map(c => ({
      ...c,
      skills: c.skills ? c.skills.split(',').map(s => s.trim()) : []
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch certifications:", error);
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}
