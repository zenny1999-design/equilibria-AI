import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = process.env.OPENROUTER_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    text?: string;
  } | null;

  const text = body?.text ?? "";

  if (!text.trim()) {
    return NextResponse.json(
      { error: "Missing text" },
      { status: 400 }
    );
  }

  const prompt =
    "Analyze the sentiment and emotion of this journal entry. Return JSON: { sentiment: 'Positive'|'Neutral'|'Negative', emotion: string, insight: string }\n\nEntry:\n" +
    text;

  const res = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
      }),
    }
  );

  if (!res.ok) {
    const msg = await res.text();

    return NextResponse.json(
      { error: msg || "OpenRouter request failed" },
      { status: 500 }
    );
  }

  const data = (await res.json()) as any;

  const content =
    data?.choices?.[0]?.message?.content ?? "";

  try {
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      {
        error: "Model did not return valid JSON",
        raw: content,
      },
      { status: 500 }
    );
  }
}