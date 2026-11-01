"use client";
import { useEffect, useRef, useState } from "react";
type It = { id: number; x: number; e: string };
const EM = ["⚡", "💻", "🎨", "🚀", "⭐"];
export default function Game() {
  const [run, setRun] = useState(false), [score, setScore] = useState(0), [left, setLeft] = useState(20), [best, setBest] = useState(0), [items, setItems] = useState<It[]>([]), [done, setDone] = useState(false);
  const id = useRef(0);
  useEffect(() => { try { setBest(+(localStorage.getItem("best") || 0)); } catch {} }, []);
  useEffect(() => {
    if (!run) return;
    const sp = setInterval(() => { const n = ++id.current; setItems((a) => [...a.slice(-14), { id: n, x: 5 + Math.random() * 88, e: EM[n % EM.length] }]); }, 550);
    const tm = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => { clearInterval(sp); clearInterval(tm); };
  }, [run]);
  useEffect(() => {
    if (run && left <= 0) { setRun(false); setItems([]); setDone(true); setBest((b) => { const nb = Math.max(b, score); try { localStorage.setItem("best", String(nb)); } catch {} return nb; }); }
  }, [left, run, score]);
  const start = () => { setScore(0); setLeft(20); setItems([]); setDone(false); setRun(true); };
  const hit = (i: It) => { setItems((a) => a.filter((x) => x.id !== i.id)); setScore((s) => s + (i.e === "⚡" ? 3 : 1)); };
  return (
    <section id="play" className="sec play">
      <h2>Catch the Bolts ⚡</h2><p>Tap everything you can in 20 seconds. ⚡ is worth 3 points!</p>
      <div className="hud"><span>Score: <b>{score}</b></span><span>Time: <b>{left}s</b></span><span>Best: <b>{best}</b></span></div>
      <div className="arena glass">
        {items.map((i) => <button key={i.id} className="fallk" style={{ left: `${i.x}%` }} onClick={() => hit(i)}>{i.e}</button>)}
        {!run && <div className="ov">{done && <h3>You scored {score}!</h3>}<button className="hire" onClick={start}>{done ? "Play again" : "Start"}</button></div>}
      </div>
    </section>
  );
}
