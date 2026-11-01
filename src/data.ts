import projects from "../data/projects.json";
export const me = {
  name: "Gimshan", email: "shang71111@gmail.com", phone: "+94 77 571 2096",
  linkedin: "https://www.linkedin.com/in/gimashanmenaka",
  github: "https://github.com/GimshanMkarunarathna",
  tiktok: "https://www.tiktok.com/@your-handle", // TODO: your TikTok
  whatsapp: "https://wa.me/94775712096",
  site: "https://gimshan-menaka.vercel.app",
  resume: "/Gimshan_Resume.pdf", // put your PDF in /public
  photo: "/images/shan.png",     // transparent PNG cut-out of you
};
export type Project = { id: string; type: "dev" | "design"; title: string; img: string; tags: string[] };
export const all = projects as Project[];
export const devProjects = all.filter((p) => p.type === "dev");
export const designProjects = all.filter((p) => p.type === "design");
