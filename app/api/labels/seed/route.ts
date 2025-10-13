// app/api/labels/seed/route.ts

// Force server execution & disable static optimization
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // Read envs inside the handler (safer for builds)
  const GH_TOKEN = process.env.GH_TOKEN;
  const GH_OWNER = process.env.GH_OWNER;
  const GH_REPO  = process.env.GH_REPO;
  const ADMIN    = process.env.LABELS_ADMIN_KEY;

  // Security: x-admin-key header OR ?key=... fallback
  const headerKey = req.headers.get('x-admin-key') ?? '';
  const url = new URL(req.url);
  const urlKey = url.searchParams.get('key') ?? '';

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });

  if (!ADMIN || (headerKey !== ADMIN && urlKey !== ADMIN)) {
    return json({ ok: false, error: 'Unauthorized' }, 401);
  }

  if (!GH_TOKEN || !GH_OWNER || !GH_REPO) {
    return json(
      { ok: false, error: 'Missing GH_TOKEN / GH_OWNER / GH_REPO envs' },
      500
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
    'User-Agent': 'swarm-sandbox-label-seeder',
  };

  async function upsert(label: { name: string; color?: string; description?: string }) {
    // Try update (PATCH)
    let res = await fetch(`${base}/${encodeURIComponent(label.name)}`, {
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
      throw new Error(
        `GitHub label upsert failed for "${label.name}": ${res.status} ${text}`
      );
    }
  }

  try {
    for (const label of LABELS) {
      await upsert(label);
    }
    return json({ ok: true, labels: LABELS });
  } catch (err: any) {
    console.error(err);
    return json({ ok: false, error: String(err?.message ?? err) }, 500);
  }
}
