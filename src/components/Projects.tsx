"use client";
import { useEffect, useState } from "react";
import { Bolt, Phone } from "./ui";
import { devProjects, designProjects } from "@/data";
import type { Mode } from "./Hero";
export default function Projects({ mode }: { mode: Mode }) {
  const [pTab, setPTab] = useState<"dev" | "design">("dev");
  useEffect(() => { if (mode !== "home") setPTab(mode); }, [mode]);
  return (
    <section id="projects" className="sec proj">
      <Bolt cls="b1" src="/images/bolt-full.png" />
      <div className="tabs">{(["dev", "design"] as const).map((t) => <button key={t} className={pTab === t ? "on" : ""} onClick={() => setPTab(t)}>{t === "dev" ? "Development" : "UI/UX Design"}</button>)}</div>
      {pTab === "dev" ? <div className="glass grid2">{devProjects.map((p) => <div key={p.id} className="card"><Phone {...p} /><div className="snip glass">Code Snippet</div><h3>{p.title}</h3><p>{p.tags.map((t) => <em key={t}>#{t}</em>)}</p></div>)}</div>
        : <div className="glass grid3">{designProjects.map((p) => <div key={p.id} className="card"><Phone {...p} /><h3>{p.title}</h3><p>{p.tags.map((t) => <em key={t}>{t}</em>)}</p></div>)}</div>}
      <div className="cap">{pTab === "dev" ? "CODE WITH PURPOSE" : "LET’S DESIGN THE FUTURE"}</div>
    </section>
  );
}
