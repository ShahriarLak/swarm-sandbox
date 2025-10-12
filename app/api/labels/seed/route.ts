// app/api/labels/seed/route.ts
import { NextResponse } from 'next/server';

// A starter set of labels you can tweak later.
// (Name + color must be hex without the leading # for GitHub-style color codes.)
const DEFAULT_LABELS = [
  { name: 'priority: high', color: 'd73a4a', description: 'Needs attention ASAP' },
  { name: 'priority: medium', color: 'fbca04', description: 'Normal priority' },
  { name: 'priority: low', color: '0e8a16', description: 'Nice to have' },
  { name: 'type: bug', color: 'b60205', description: 'Something is broken' },
  { name: 'type: feature', color: '0052cc', description: 'New functionality' },
  { name: 'area: ui', color: 'c5def5', description: 'User interface / visual' },
  { name: 'area: api', color: '5319e7', description: 'Backend / API' },
];

// GET returns the default list (useful for previewing what will be seeded)
export async function GET() {
  return NextResponse.json({ ok: true, labels: DEFAULT_LABELS });
}

// POST is where you'd later add logic to persist/seed labels
// (e.g., call GitHub API with a token, or write to your DB).
// For now, it just returns the same list.
export async function POST() {
  // TODO: add seeding logic (GitHub API / DB) when ready.
  return NextResponse.json({ ok: true, seeded: DEFAULT_LABELS.length, labels: DEFAULT_LABELS });
}
