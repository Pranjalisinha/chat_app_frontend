// Simple client-side message rewriter with three styles: restructure, funny, sarcastic
// This is heuristic and runs locally; replace with a real AI API if available.

const commonReplacements = [
  [/\bu\b/gi, "you"],
  [/\bur\b/gi, "your"],
  [/\bpls\b/gi, "please"],
  [/\bplz\b/gi, "please"],
  [/\bbtw\b/gi, "by the way"],
  [/\bidk\b/gi, "I don't know"],
  [/\bomg\b/gi, "oh my gosh"],
  [/\bthx\b/gi, "thanks"],
  [/\bty\b/gi, "thank you"],
];

function normalizeWhitespace(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
}

function ensureSentencePunctuation(text) {
  if (!text) return text;
  const trimmed = text.trim();
  const end = trimmed.slice(-1);
  if (/[.!?]$/.test(end)) return trimmed;
  return trimmed + ".";
}

function sentenceCase(text) {
  const sentences = text
    .split(/([.!?])\s+/)
    .reduce((acc, cur, idx, arr) => {
      if (/[.!?]/.test(cur) && acc.length > 0) {
        acc[acc.length - 1] += cur;
      } else if (cur.trim()) {
        const capped = cur.trim().charAt(0).toUpperCase() + cur.trim().slice(1);
        acc.push(capped);
      }
      return acc;
    }, []);
  return sentences.join(" ");
}

function applyCommon(text) {
  let out = text;
  commonReplacements.forEach(([re, rep]) => {
    out = out.replace(re, rep);
  });
  out = normalizeWhitespace(out);
  out = sentenceCase(out);
  out = ensureSentencePunctuation(out);
  return out;
}

function makeFunny(text) {
  const emojis = ["😂", "😜", "🎉", "😎", "✨", "🤣", "🤹"];
  const pick = emojis[Math.floor(Math.random() * emojis.length)];
  const prefixes = [
    "Not to brag, but ",
    "Plot twist: ",
    "Hot take: ",
    "Fun fact: ",
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const out = applyCommon(text);
  return `${prefix}${out} ${pick}`;
}

function makeSarcastic(text) {
  const templates = [
    (t) => `Oh absolutely, because ${t.toLowerCase()} is exactly what we all needed. 🙄`,
    (t) => `Wow, groundbreaking idea: ${t.toLowerCase()}. Truly revolutionary. 🙃`,
    (t) => `Sure, ${t.toLowerCase()}. What could possibly go wrong. 😒`,
  ];
  const fn = templates[Math.floor(Math.random() * templates.length)];
  const out = applyCommon(text);
  return fn(out);
}

export function rewriteMessage(text, style) {
  const base = (text || "").trim();
  if (!base) return "";
  switch ((style || "").toLowerCase()) {
    case "restructure":
      return applyCommon(base);
    case "funny":
      return makeFunny(base);
    case "sarcastic":
      return makeSarcastic(base);
    default:
      return applyCommon(base);
  }
}


