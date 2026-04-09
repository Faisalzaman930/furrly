import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, skills, message } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_VOLUNTEER_LIST_ID || 6);

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey!,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: name || "", SKILLS: skills || "", MESSAGE: message || "" },
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.code !== "duplicate_parameter") {
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
