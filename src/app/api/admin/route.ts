import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Saving works only locally (npm run dev). Then commit & push to deploy." }, { status: 403 });
  const f = await req.formData();
  if (f.get("password") !== (process.env.ADMIN_PASSWORD || "shan123")) return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  const list = JSON.parse(String(f.get("projects")));
  const up = path.join(process.cwd(), "public/uploads"); await fs.mkdir(up, { recursive: true });
  for (const p of list) {
    const file = f.get("img:" + p.id);
    if (file instanceof File && file.size) { const name = `${p.id}-${file.name.replace(/[^\w.-]/g, "_")}`; await fs.writeFile(path.join(up, name), Buffer.from(await file.arrayBuffer())); p.img = "/uploads/" + name; }
  }
  await fs.writeFile(path.join(process.cwd(), "data/projects.json"), JSON.stringify(list, null, 2));
  return NextResponse.json({ ok: true, projects: list });
}
