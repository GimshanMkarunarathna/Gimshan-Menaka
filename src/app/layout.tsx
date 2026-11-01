import "./globals.css";
export const metadata = { title: "Gimshan | Full-Stack Developer & UI/UX Designer", description: "Portfolio of Gimshan (Shan)" };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Yellowtail&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>);
}
