import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { jobName } = await request.json();

    if (!jobName) {
      return NextResponse.json({ error: 'Job name is required' }, { status: 400 });
    }

    const jobPath = join(process.cwd(), 'automation', 'jobs', jobName);
    const statusPath = join(jobPath, 'status.json');

    // Update status to pending
    const statusData = {
      status: 'pending',
      updatedAt: new Date().toISOString(),
    };

    await writeFile(statusPath, JSON.stringify(statusData, null, 2));

    return NextResponse.json({ success: true, message: 'Job queued for reprocessing' });
  } catch (error) {
    console.error('Error reprocessing job:', error);
    return NextResponse.json({ error: 'Failed to reprocess job' }, { status: 500 });
  }
}
