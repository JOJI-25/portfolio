import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dashboards as defaultDashboards } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let items = await db.dashboardItem.findMany();
    

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch dashboard items:", error);
    return NextResponse.json({ error: 'Failed to fetch dashboards' }, { status: 500 });
  }
}
