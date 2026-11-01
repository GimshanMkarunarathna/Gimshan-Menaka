"use client";
import { useMemo, useRef } from "react";
const COLS = 10, ROWS = 16, R = 150;
// Photo split into tiles; cursor/finger blows nearby tiles apart, they float back when it leaves.
export default function Shatter({ src, ratio }: { src: string; ratio: number }) {
  const box = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const rot = useMemo(() => Array.from({ length: COLS * ROWS }, (_, i) => ((i * 7919) % 41) - 20), []);
  const move = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect(), px = e.clientX - r.left, py = e.clientY - r.top;
    tiles.current.forEach((t, i) => {
      if (!t) return;
      const x = ((i % COLS) + 0.5) / COLS * r.width, y = (Math.floor(i / COLS) + 0.5) / ROWS * r.height;
      const dx = x - px, dy = y - py, d = Math.hypot(dx, dy) || 1;
      if (d < R) { const f = 1 - d / R, m = f * 170; t.style.transform = `translate(${(dx / d) * m}px,${(dy / d) * m}px) rotate(${rot[i] * f * 3}deg) scale(${1 - f * 0.4})`; t.style.opacity = String(1 - f * 0.55); }
      else { t.style.transform = ""; t.style.opacity = "1"; }
    });
  };
  const reset = () => tiles.current.forEach((t) => { if (t) { t.style.transform = ""; t.style.opacity = "1"; } });
  return (
    <div ref={box} className="shatter" style={{ aspectRatio: ratio }} onPointerMove={move} onPointerLeave={reset}>
      {Array.from({ length: COLS * ROWS }, (_, i) => (
        <div key={i} ref={(el) => { tiles.current[i] = el; }} className="tile" style={{
          left: `${(i % COLS) * (100 / COLS)}%`, top: `${Math.floor(i / COLS) * (100 / ROWS)}%`, width: `${100 / COLS + 0.2}%`, height: `${100 / ROWS + 0.2}%`,
          backgroundImage: `url(${src})`, backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${((i % COLS) / (COLS - 1)) * 100}% ${(Math.floor(i / COLS) / (ROWS - 1)) * 100}%` }} />
      ))}
    </div>
  );
}
