"use client";
import { useState } from "react";
import { all, Project } from "@/data";
export default function Admin() {
  const [list, setList] = useState<Project[]>(all), [pw, setPw] = useState(""), [files, setFiles] = useState<Record<string, File>>({}), [msg, setMsg] = useState("");
  const upd = (i: number, p: Partial<Project>) => setList((l) => l.map((x, j) => (j === i ? { ...x, ...p } : x)));
  const save = async () => {
    const f = new FormData(); f.set("password", pw); f.set("projects", JSON.stringify(list));
    Object.entries(files).forEach(([id, file]) => f.set("img:" + id, file));
    const r = await fetch("/api/admin", { method: "POST", body: f }), j = await r.json();
    setMsg(r.ok ? "Saved ✔ now refresh the site" : j.error); if (r.ok) { setList(j.projects); setFiles({}); }
  };
  return (
    <main className="adm"><h1>Admin: Projects</h1>
      <input type="password" placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} />
      {list.map((p, i) => (
        <div key={p.id} className="glass arow">
          <input value={p.title} onChange={(e) => upd(i, { title: e.target.value })} placeholder="Title" />
          <select value={p.type} onChange={(e) => upd(i, { type: e.target.value as Project["type"] })}><option value="dev">Development</option><option value="design">UI/UX Design</option></select>
          <input value={p.tags.join(", ")} onChange={(e) => upd(i, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })} placeholder="Tags, comma separated" />
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && setFiles((o) => ({ ...o, [p.id]: e.target.files![0] }))} />
          <button onClick={() => setList((l) => l.filter((_, j) => j !== i))}>Delete</button>
        </div>))}
      <div className="abtn"><button onClick={() => setList((l) => [...l, { id: "p" + Date.now(), type: "dev", title: "New project", img: "", tags: [] }])}>+ Add project</button><button className="on" onClick={save}>Save</button><span>{msg}</span></div>
    </main>
  );
}
