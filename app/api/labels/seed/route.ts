// app/api/labels/seed/route.ts
import { NextResponse } from "next/server";

// --- SECURITY GATE ---
// Accept admin key via header OR query param for easy browser testing.
function isAuthorized(req: Request) {
  const adminKey = process.env.LABELS_ADMIN_KEY;
  const headerKey = req.headers.get("x-admin-key") ?? undefined;
  const urlKey = new URL(req.url).searchParams.get("key") ?? undefined; // optional fallback
  if (!adminKey) return false;
  return headerKey === adminKey || urlKey === adminKey;
}

// --- LABELS YOU WANT IN THE REPO ---
const LABELS = [
  { name: "priority: high", color: "d73a4a", description: "Needs attention ASAP" },
  { name: "priority: medium", color: "fbca04", description: "Normal priority" },
  { name: "priority: low", color: "0e8a16", description: "Nice to have" },
  { name: "type: bug", color: "b60205", description: "Something is broken" },
  { name: "type: feature", color: "0052cc", description: "New functionality" },
  { name: "area: ui", color: "c5def5", description: "User interface / visual" },
  { name: "area: api", color: "5319e7", description: "Backend / API" },
];

// --- GitHub repo + token ---
const GH_TOKEN = process.env.GH_TOKEN;
const GH_OWNER = process.env.GH_OWNER; // e.g., "ShahriarLak"
const GH_REPO  = process.env.GH_REPO;  // e.g., "swarm-sandbox"

if (!GH_TOKEN || !GH_OWNER || !GH_REPO) {
  console.warn("Missing GH env vars: GH_TOKEN, GH_OWNER, GH_REPO");
}

async function upsertLabel(label: { name: string; color?: string; description?: string }) {
  const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/labels/${encodeURIComponent(label.name)}`;
  const createUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/labels`;

  // Try update first (PATCH)
  let res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_name: label.name,
      color: (label.color ?? "ededed").replace("#", ""),
      description: label.description ?? "",
    }),
  });

  if (res.status === 404) {
    // Create instead (POST)
    res = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GH_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: label.name,
        color: (label.color ?? "ededed").replace("#", ""),
        description: label.description ?? "",
      }),
    });
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub label upsert failed for "${label.name}": ${res.status} ${text}`);
  }
}

export async function GET(req: Request) {
  // 1) Security gate
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // 2) Basic sanity checks
  if (!GH_TOKEN || !GH_OWNER || !GH_REPO) {
    return NextResponse.json(
      { ok: false, error: "Missing GitHub env vars (GH_TOKEN, GH_OWNER, GH_REPO)" },
      { status: 500 }
    );
  }

  try {
    for (const label of LABELS) {
      await upsertLabel(label);
    }
    return NextResponse.json({ ok: true, labels: LABELS });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: String(err?.message ?? err) }, { status: 500 });
  }
}
