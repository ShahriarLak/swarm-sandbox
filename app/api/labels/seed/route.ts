// app/api/labels/seed/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type LabelInput = {
  name: string;
  color: string;           // hex (no leading #)
  description?: string;
};

type SeedPayload = {
  repo?: string;           // "owner/repo" (e.g., "ShahriarLak/swarm-sandbox")
  labels?: LabelInput[];   // optional override; falls back to DEFAULT_LABELS
  token?: string;          // optional override; falls back to env GITHUB_TOKEN
};

type GitHubLabelCreateRequest = {
  name: string;
  color: string;
  description?: string;
};

type GitHubError = {
  message: string;
  documentation_url?: string;
};

const DEFAULT_LABELS: LabelInput[] = [
  { name: 'priority: high',   color: 'd73a4a', description: 'Needs attention ASAP' },
  { name: 'priority: medium', color: 'fbca04', description: 'Normal priority' },
  { name: 'priority: low',    color: '0e8a16', description: 'Nice to have' },
  { name: 'type: bug',        color: 'b60205', description: 'Something is broken' },
  { name: 'type: feature',    color: '0052cc', description: 'New functionality' },
  { name: 'area: ui',         color: 'c5def5', description: 'User interface / visual' },
  { name: 'area: api',        color: '5319e7', description: 'Backend / API' },
];

function ghHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function GET() {
  return NextResponse.json({ ok: true, labels: DEFAULT_LABELS });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SeedPayload;

  const token = process.env.GITHUB_TOKEN ?? body.token;
  const repo =
    body.repo ??
    process.env.GITHUB_REPO ?? // should be "owner/repo"
    '';

  const labels: LabelInput[] =
    body.labels && body.labels.length > 0 ? body.labels : DEFAULT_LABELS;

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Missing token. Set env GITHUB_TOKEN or include { token } in the request body.',
      },
      { status: 400 }
    );
  }

  if (!repo || !repo.includes('/')) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Missing repo. Provide "owner/repo" via env GITHUB_REPO or in the request body.',
      },
      { status: 400 }
    );
  }

  const url = `https://api.github.com/repos/${repo}/labels`;
  const headers = ghHeaders(token);

  const results: { name: string; ok: boolean; status: number; error?: string }[] = [];

  for (const label of labels) {
    const payload: GitHubLabelCreateRequest = {
      name: label.name,
      color: label.color.replace('#', ''),
      description: label.description,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errText = '';
      try {
        const errJson = (await res.json()) as GitHubError | Record<string, unknown>;
        errText = 'message' in errJson ? (errJson as GitHubError).message : JSON.stringify(errJson);
      } catch {
        // ignore parse failures; keep minimal error
      }
      results.push({ name: label.name, ok: false, status: res.status, error: errText });
      // continue even on 422 (duplicate) or other errors
      continue;
    }

    results.push({ name: label.name, ok: true, status: res.status });
  }

  const createdCount = results.filter((r) => r.ok).length;
  return NextResponse.json({ ok: true, created: createdCount, results });
}
