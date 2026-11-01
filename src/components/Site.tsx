"use client";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { me } from "@/data";
import Hero, { Mode } from "./Hero";
import Projects from "./Projects";
import About from "./About";
import Game from "./Game";
import Contact from "./Contact";

const IDS = [["home", "Home"], ["projects", "Projects"], ["about", "About Me"], ["play", "Play"], ["contact", "Contact"]];
export default function Site() {
  const [mode, setMode] = useState<Mode>("home");
  const [active, setActive] = useState("home");
  useEffect(() => {
    const on = () => {
      let cur = "home";
      IDS.forEach(([id]) => { const e = document.getElementById(id); if (e && e.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
      setActive(cur);
    };
    on(); addEventListener("scroll", on);
    const els = document.querySelectorAll(".proj>:not(.bolt),.about>:not(.bolt),.contact>:not(.bolt),.play>*");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    els.forEach((e, i) => { e.classList.add("rv"); (e as HTMLElement).style.transitionDelay = `${(i % 4) * 0.12}s`; io.observe(e); });
    return () => { removeEventListener("scroll", on); io.disconnect(); };
  }, []);
  const nav = mode !== "home" && active === "home" ? "projects" : active;
  return (<>
    <nav className="nav">
      <a className="logo" href="#home" onClick={() => setMode("home")}>Shan.</a>
      <div className="pill">{IDS.map(([id, l]) => <a key={id} href={`#${id}`} className={nav === id ? "on" : ""} onClick={() => id === "home" && setMode("home")}>{l}</a>)}</div>
      <a className="dl" href={me.resume} download><FaDownload /><span>Download<br />Resume</span></a>
    </nav>
    <Hero mode={mode} setMode={setMode} />
    <Projects mode={mode} />
    <About />
    <Game />
    <Contact />
  </>);
}
