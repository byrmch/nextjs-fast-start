import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

let rawUsage: Record<string, number> | null = null;
let thinking = false;

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com/v1",
  apiKey: process.env.DEEPSEEK_API_KEY,
  fetch: async (url, init) => {
    if (!thinking && typeof url === "string" && url.includes("/chat/completions") && init?.body) {
      try {
        const bodyStr = typeof init.body === "string" ? init.body : new TextDecoder().decode(init.body as BufferSource);
        const body = JSON.parse(bodyStr);
        body.thinking = { type: "disabled" };
        init = { ...init, body: JSON.stringify(body) };
      } catch { /* pass through unmodified */ }
    }
    const res = await fetch(url, init);
    if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
      const cloned = res.clone();
      const body = await cloned.json();
      rawUsage = body?.usage ?? null;
    }
    return res;
  },
});

const modelName = process.env.AI_MODEL || "deepseek-v4-flash";

const PRICING: Record<string, { cacheHit: number; cacheMiss: number; output: number }> = {
  "deepseek-v4-flash": { cacheHit: 0.02, cacheMiss: 1.00, output: 2.00 },
  "deepseek-v4-pro":   { cacheHit: 0.025, cacheMiss: 3.00, output: 6.00 },
};

export async function askAI(prompt: string, enableThinking = false) {
  thinking = enableThinking;
  const t0 = performance.now();
  const { text, usage, finishReason } = await generateText({
    model: deepseek.chat(modelName),
    system: "你是一个有用的助手。",
    prompt,
  });
  const elapsed = performance.now() - t0;

  const price = PRICING[modelName];

  const cacheHit = rawUsage?.prompt_cache_hit_tokens ?? 0;
  const cacheMiss = rawUsage?.prompt_cache_miss_tokens ?? (usage.inputTokens ?? 0) - cacheHit;

  let cost = 0;
  if (price) {
    cost = (cacheHit / 1_000_000) * price.cacheHit
         + (cacheMiss / 1_000_000) * price.cacheMiss
         + ((usage.outputTokens ?? 0) / 1_000_000) * price.output;
  }

  const fmt = (n: number | undefined) => {
    const v = n ?? 0;
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
    return String(v);
  };

  console.log(
    `[AI] model=${modelName} finish=${finishReason} ` +
    `input=${fmt(usage.inputTokens)}(hit=${fmt(cacheHit)} miss=${fmt(cacheMiss)}) ` +
    `output=${fmt(usage.outputTokens)} total=${fmt(usage.totalTokens)} ` +
    `time=${elapsed.toFixed(0)}ms cost=¥${cost.toFixed(4)}`
  );

  return {
    text,
    elapsed: Math.round(elapsed),
    model: modelName,
    usage: {
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      totalTokens: usage.totalTokens,
      cacheReadTokens: cacheHit,
      noCacheTokens: cacheMiss,
    },
    cost: Math.round(cost * 10000) / 10000,
  };
}
