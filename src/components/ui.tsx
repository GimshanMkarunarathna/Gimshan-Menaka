"use client";
import { useState } from "react";
import { FaMobileAlt } from "react-icons/fa";
export const Bolt = ({ cls, src }: { cls: string; src: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={`bolt ${cls}`} src={src} alt="" />
);
export const Phone = ({ title, img }: { title: string; img: string }) => {
  const [bad, setBad] = useState(false);
  // eslint-disable-next-line @next/next/no-img-element
  return <div className="phone">{bad ? <div className="phone-ph"><FaMobileAlt /><span>{title}</span></div> : <img src={img} alt={title} onError={() => setBad(true)} />}</div>;
};

