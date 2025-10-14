// app/api/labels/seed/route.ts
import { NextResponse } from 'next/server';

type LabelSeed = {
  name: string;
  color: string;
  description?: string;
};

// You can keep your existing values; these are examples:
const LABELS: LabelSeed[] = [
  { name: 'priority: high', color: 'd73a4a', description: 'Needs attention ASAP' },
  { name: 'priority: medium', color: 'fbca04', description: 'Normal priority' },
  { name: 'priority: low', color: '0e8a16', description: 'Nice to have' },
  { name: 'type: bug', color: 'b60205', description: 'Something is broken' },
  { name: 'type: feature', color: '0052cc', description: 'New functionality' },
  { name: 'area: ui', color: 'c5def5', description: 'User interface / visual' },
  { name: 'area: api', color: '5319e7', description: 'Backend / API' },
];

// CORS headers so the bookmarklet running on github.com can fetch this endpoint
const corsHeaders: Record<string, string> = {
  // keep it simple; we don't send credentials
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Vary': 'Origin',
};

export function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export function GET() {
  return new NextResponse(
    JSON.stringify({ ok: true, labels: LABELS }),
    { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
  );
}
