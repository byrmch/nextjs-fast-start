"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type S = "idle" | "loading" | "ok" | "fail";

export default function Home() {
  const [db, setDb] = useState<S>("loading");
  const [ai, setAi] = useState<S>("idle");
  const [err, setErr] = useState<S>("loading");
  const [msg, setMsg] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((d) => {
        setDb(d.code === 0 ? "ok" : "fail");
        setMsg((m) => ({ ...m, db: d.code === 0 ? "连接正常" : d.msg }));
      })
      .catch(() => { setDb("fail"); setMsg((m) => ({ ...m, db: "请求失败" })); });

    fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((r) => r.json())
      .then((d) => {
        setErr(d.code === 400 ? "ok" : "fail");
        setMsg((m) => ({ ...m, err: d.code === 400 ? `code:${d.code} msg:"${d.msg}"` : "非预期返回" }));
      })
      .catch(() => { setErr("fail"); setMsg((m) => ({ ...m, err: "请求失败" })); });
  }, []);

  async function testAI() {
    setAi("loading");
    const r = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "1+1=?" }),
    });
    const d = await r.json();
    setAi(d.code === 0 ? "ok" : "fail");
    setMsg((m) => ({ ...m, ai: d.code === 0 ? "响应正常" : d.msg }));
  }

  const icon = (s: S) => ({ ok: "✅", fail: "❌", loading: "⏳", idle: "⬜" }[s]);

  const rows: [React.ReactNode, string, React.ReactNode, (() => void) | undefined][] = [
    ["✅", "Next.js 16", "页面正常渲染", undefined],
    ["✅", "Tailwind CSS", <span key="tw" className="flex gap-1"><span className="inline-block w-3.5 h-3.5 rounded-sm bg-primary" /><span className="inline-block w-3.5 h-3.5 rounded-sm bg-destructive" /><span className="inline-block w-3.5 h-3.5 rounded-sm bg-ring border" /></span>, undefined],
    ["✅", "shadcn/ui", <span key="sh" className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border/50 text-xs">组件可用</span>, undefined],
    [icon(db), "数据库", msg.db ?? (db === "loading" ? "检测中..." : ""), undefined],
    [icon(ai), "AI 接口", msg.ai, ai === "idle" ? testAI : undefined],
    [icon(err), "异常处理", msg.err ?? (err === "loading" ? "检测中..." : ""), undefined],
  ];

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <h1 className="text-xl font-bold mb-6">框架自检</h1>
      {rows.map(([ico, label, detail, action]) => (
        <div key={label as string} className="flex items-center gap-3 py-2.5 border-b border-border/20 text-sm">
          <span className="w-5 text-center shrink-0">{ico}</span>
          <span className="font-medium w-24 shrink-0">{label}</span>
          <span className="text-muted-foreground flex-1 min-w-0 truncate">{detail}</span>
          {action && <Button size="sm" variant="outline" className="h-6 text-xs shrink-0" onClick={action}>检测</Button>}
        </div>
      ))}
      <p className="mt-8 text-xs text-muted-foreground">克隆项目后跑通这 6 项即可开始开发。</p>
    </div>
  );
}
