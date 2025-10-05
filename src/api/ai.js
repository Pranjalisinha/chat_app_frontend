// src/api/ai.js
// Provides message rewriting using OpenAI or a backend proxy.

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function makePrompt(text, style) {
  const baseInstruction = "Rewrite the user's message according to the specified style. Keep meaning.";
  const styleInstruction = (() => {
    const s = (style || "").toLowerCase();
    if (s === "funny") return "Make it playful and humorous, light tone, concise.";
    if (s === "sarcastic") return "Make it witty and sarcastic, but not offensive. Keep concise.";
    return "Improve clarity and structure. Fix grammar. Keep concise and natural.";
  })();
  return `${baseInstruction}\nStyle: ${styleInstruction}\n\nUser message:\n"""\n${text}\n"""\n\nRewritten:`;
}

async function callOpenAI(text, style) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing VITE_OPENAI_API_KEY");
  }
  const prompt = makePrompt(text, style);
  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You rewrite text with the requested style. Keep it short and friendly." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenAI error: ${res.status} ${errText}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content?.trim() || "";
  return content;
}

async function callBackendProxy(text, style) {
  const base = import.meta.env.VITE_AI_ENDPOINT || "/api/ai/rewrite";
  const payload = { text, style };
  const res = await fetch(base, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`AI proxy error: ${res.status} ${errText}`);
  }
  const data = await res.json();
  return (data?.text || data?.result || "").trim();
}

export async function rewriteWithAI(text, style) {
  // Prefer backend proxy when configured; fallback to direct OpenAI if key exists.
  const hasProxy = !!import.meta.env.VITE_AI_ENDPOINT;
  const hasApiKey = !!import.meta.env.VITE_OPENAI_API_KEY;
  if (hasProxy) return callBackendProxy(text, style);
  if (hasApiKey) return callOpenAI(text, style);
  throw new Error("No AI configured. Set VITE_AI_ENDPOINT or VITE_OPENAI_API_KEY.");
}


