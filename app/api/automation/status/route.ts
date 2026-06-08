import { NextResponse } from 'next/server';
import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';

export const dynamic = 'force-dynamic';

interface AutomationJob {
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  url?: string;
  error?: string;
}

export async function GET() {
  try {
    const automationPath = join(process.cwd(), 'automation', 'jobs');
    
    // Check if automation directory exists
    try {
      await stat(automationPath);
    } catch {
      // Directory doesn't exist, return empty
      return NextResponse.json({ jobs: [] });
    }

    const folders = await readdir(automationPath);
    const jobs: AutomationJob[] = [];

    for (const folder of folders) {
      const folderPath = join(automationPath, folder);
      const stats = await stat(folderPath);
      
      // Check for status file
      let status: 'pending' | 'processing' | 'completed' | 'failed' = 'pending';
      let url: string | undefined;
      let error: string | undefined;

      try {
        const statusFilePath = join(folderPath, 'status.json');
        const statusContent = await readFile(statusFilePath, 'utf-8');
        const statusData = JSON.parse(statusContent);
        status = statusData.status || 'pending';
        url = statusData.url;
        error = statusData.error;
      } catch {
        // No status file, assume pending
      }

      jobs.push({
        name: folder,
        status,
        createdAt: stats.birthtime.toISOString(),
        url,
        error,
      });
    }

    // Sort by creation date, newest first
    jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching automation status:', error);
    return NextResponse.json({ error: 'Failed to fetch automation status' }, { status: 500 });
  }
}
