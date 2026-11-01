"use client";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { IconType } from "react-icons";
import { FaJava, FaPenNib, FaEnvelope, FaLinkedin, FaGithub, FaTiktok, FaWhatsapp, FaLink, FaMobileAlt, FaDownload, FaPlay } from "react-icons/fa";
import { SiNodedotjs, SiJavascript, SiDotnet, SiThreedotjs, SiFlutter, SiReact, SiPython, SiMysql, SiKotlin, SiOpenai, SiPinterest, SiAdobeillustrator, SiFigma, SiBlender, SiCanva, SiGooglegemini, SiFirebase } from "react-icons/si";
import { me } from "@/data";
export type Mode = "home" | "dev" | "design";
type Ic = { I: IconType; c: string; p: [number, number] };
const DEV: Ic[] = [
  { I: SiNodedotjs, c: "#6cc24a", p: [22, 22] }, { I: SiJavascript, c: "#f7df1e", p: [34, 18] }, { I: SiDotnet, c: "#512bd4", p: [9, 33] },
  { I: SiThreedotjs, c: "#ddd", p: [24, 33] }, { I: SiFlutter, c: "#3ab8f5", p: [34, 36] }, { I: SiReact, c: "#61dafb", p: [19, 47] },
  { I: FaJava, c: "#e76f00", p: [12, 56] }, { I: SiPython, c: "#ffd43b", p: [28, 52] }, { I: SiMysql, c: "#4aa3df", p: [8, 66] },
  { I: SiKotlin, c: "#a97bff", p: [20, 68] }, { I: SiOpenai, c: "#fff", p: [30, 70] },
];
const DES: Ic[] = [
  { I: SiPinterest, c: "#e60023", p: [66, 18] }, { I: SiAdobeillustrator, c: "#ff9a00", p: [78, 20] }, { I: FaGithub, c: "#fff", p: [90, 24] },
  { I: SiFigma, c: "#f24e1e", p: [66, 36] }, { I: SiBlender, c: "#f5792a", p: [75, 38] }, { I: FaPenNib, c: "#bba3ff", p: [92, 42] },
  { I: SiCanva, c: "#00c4cc", p: [80, 54] }, { I: SiGooglegemini, c: "#7aa7ff", p: [87, 68] },
];
const copy = { dev: { t: "FULL-STACK DEVELOPMENT SHOWCASE", cx: 25, side: "right" }, design: { t: "UI/UX DESIGN SHOWCASE", cx: 75, side: "left" } };


export default function Hero({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [narrow, setNarrow] = useState(false);
  const [bad, setBad] = useState(false);
  const img = useRef<HTMLImageElement>(null), disp = useRef<SVGFEDisplacementMapElement>(null), lens = useRef<HTMLDivElement>(null);
  const st = useRef({ x: 0, y: 0, v: 0 });
  useEffect(() => {
    const rs = () => setNarrow(innerWidth < 800); rs(); addEventListener("resize", rs);
    let raf = 0;
    const loop = () => { // cursor speed -> blur + wobble on the photo, then it settles back
      const o = st.current; o.v *= 0.92; const v = Math.min(o.v, 60); raf = requestAnimationFrame(loop);
    };
    loop(); return () => { cancelAnimationFrame(raf); removeEventListener("resize", rs); };
  }, []);
  const move = (e: React.PointerEvent<HTMLElement>) => {
    const o = st.current, r = e.currentTarget.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    o.v = Math.min(60, o.v + Math.hypot(x - o.x, y - o.y) * 0.3); o.x = x; o.y = y;
    if (lens.current) { lens.current.style.transform = `translate(${x - 70}px,${y - 70}px)`; lens.current.style.opacity = "0"; }
    if (img.current) img.current.style.rotate = `${(x / r.width - 0.5) * 4}deg`;
  };
  const cx = mode === "home" || narrow ? 50 : copy[mode].cx;
  const place = (list: Ic[], cat: "dev" | "design") => list.map((ic, i) => {
    const on = mode === cat, hidden = mode !== "home" && !on;
    const ring = i % 2, a = ((i / list.length) * 360 + ring * 25) * Math.PI / 180;
    const left = on ? cx + (ring ? 21 : 14) * Math.cos(a) : ic.p[0], top = on ? 50 + (ring ? 42 : 28) * Math.sin(a) : ic.p[1];
    return <span key={cat + i} className="tico" style={{ left: `${left}%`, top: `${top}%`, color: ic.c, opacity: hidden ? 0 : 1, transform: `translate(-50%,-50%) scale(${hidden ? 0.3 : 1})` }}><ic.I /></span>;
  });
  return (
    <section id="home" className="sec hero" onPointerMove={move} onPointerLeave={() => lens.current && (lens.current.style.opacity = "0")}>
      <svg width="0" height="0" style={{ position: "absolute" }}><filter id="warp"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves={2} result="n" /><feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
      <div ref={lens} className="lens" />
      {mode !== "home" && [28, 42].map((w) => <i key={w} className="ring" style={{ left: `${cx}%`, width: `${w}%`, height: `${w * 2}%`, maxHeight: "95%" }} />)}
      {place(DEV, "dev")}{place(DES, "design")}
      <img ref={img} className="me" style={{ left: `${cx}%` }} alt="Gimshan" src={bad ? "/images/shan-placeholder.svg" : me.photo} onError={() => setBad(true)} />
      {mode !== "home" && <h1 className={`hl ${copy[mode].side}`} key={mode}><b>Gimshan:</b>{copy[mode].t}</h1>}
      {mode === "home" && <>
        <button className="tag l" onClick={() => setMode("dev")}><FaPlay /> Development</button>
        <button className="tag r" onClick={() => setMode("design")}>Design <FaPlay /></button></>}
    </section>
  );
}
