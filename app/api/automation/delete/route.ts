import { NextResponse } from 'next/server';
import { rm } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { jobName } = await request.json();

    if (!jobName) {
      return NextResponse.json({ error: 'Job name is required' }, { status: 400 });
    }

    const jobPath = join(process.cwd(), 'automation', 'jobs', jobName);

    // Delete the job folder
    await rm(jobPath, { recursive: true, force: true });

    return NextResponse.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
