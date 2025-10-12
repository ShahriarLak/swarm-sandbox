// app/api/labels/seed/route.ts

// Force server execution & disable static caching
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  'use server';

  // Read environment variables inside the handler (safer for builds)
  const GH_TOKEN = process.env.GH_TOKEN;
  const GH_OWNER = process.env.GH_OWNER;
  const GH_REPO  = process.env.GH_REPO;
  const ADMIN    = process.env.LABELS_ADMIN_KEY;

  const unauthorized = () =>
    new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });

  // Security: x-admin-key header OR ?key=... fallback
  const headerKey = req.headers.get('x-admin-key') ?? '';
  const urlKey = req.nextUrl.searchParams.get('key') ?? '';
  if (!ADMIN || (headerKey !== ADMIN && urlKey !== ADMIN)) {
    return unauthorized();
  }

  if (!GH_TOKEN || !GH_OWNER || !GH_REPO) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing GH_TOKEN / GH_OWNER / GH_REPO' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }

  const LABELS = [
    { name: 'priority: high',   color: 'd73a4a', description: 'Needs attention ASAP' },
    { name: 'priority: medium', color: 'fbca04', description: 'Normal priority' },
    { name: 'priority: low',    color: '0e8a16', description: 'Nice to have' },
    { name: 'type: bug',        color: 'b60205', description: 'Something is broken' },
    { name: 'type: feature',    color: '0052cc', description: 'New functionality' },
    { name: 'area: ui',         color: 'c5def5', description: 'User interface / visual' },
    { name: 'area: api',        color: '5319e7', description: 'Backend / API' },
  ];

  const base = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/labels`;
  const headers = {
    Authorization: `Bearer ${GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'swarm-sandbox-label-seeder', // helpful for GitHub
  };

  async function upsert(label: { name: string; color?: string; description?: string }) {
    const updateUrl = `${base}/${encodeURIComponent(label.name)}`;

    // Try update (PATCH)
    let res = await fetch(updateUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({
        new_name: label.name,
        color: (label.color ?? 'ededed').replace('#', ''),
        description: label.description ?? '',
      }),
    });

    // If not found, create (POST)
    if (res.status === 404) {
      res = await fetch(base, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: label.name,
          color: (label.color ?? 'ededed').replace('#', ''),
          description: label.description ?? '',
        }),
      });
    }

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GitHub label upsert failed for "${label.name}": ${res.status} ${text}`);
    }
  }

  try {
    for (const label of LABELS) {
      await upsert(label);
    }

    return new Response(JSON.stringify({ ok: true, labels: LABELS }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err?.message ?? err) }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
