import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey || !listId) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // Upsert contact into Brevo
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true, // add to list even if contact already exists
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // code 300 = contact already exists — still a success for us
    if (err.code !== "duplicate_parameter") {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
