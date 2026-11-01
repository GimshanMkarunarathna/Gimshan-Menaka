"use client";
import { SiFigma, SiFlutter, SiFirebase } from "react-icons/si";
import { Bolt } from "./ui";
import Shatter from "./Shatter";
export default function About() {
  return (
    <section id="about" className="sec about">
      <Bolt cls="b2" src="/images/bolt-crop.png" />
      <div className="abt-l">
      <small>Hey , I am <span>Gimshan</span></small><h2>UI/UX designer</h2><p className="sub">I design intuitive, user-focused interfaces that deliver seamless digital experiences.</p>
      <div className="glass bio"><b className="q">“</b>
        <p>I am Gimshan, a designer-developer hybrid passionate about the point where design meets code. With strong foundational skills in UI/UX design (using Figma) and mobile app development (using Flutter &amp; Firebase), I specialize in translating complex ideas into seamless, high-performance digital products.</p><hr />
        <ul><li><SiFigma color="#f24e1e" /> UI/UX (Figma) Crafting intuitive and user-centric interfaces.</li><li><SiFlutter color="#3ab8f5" /> Flutter Building cross-platform mobile experiences.</li><li><SiFirebase color="#ffa000" /> Firebase Integrating backend services and real-time data.</li></ul><hr />
        <p className="c">Designer @ HackathonHub Spearheading design for high-energy tech events</p></div>
    </div>
      <div className="abt-r"><Shatter src="/images/shan-suit.png" ratio={513 / 970} /></div>
    </section>
  );
}
