import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import ErrorBoundary from "./components/ErrorBoundary";

export const meta = () => {
  return [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { title: "BengkelAI - Platform AI untuk Perawatan Motor Terpercaya" },
    { name: "description", content: "BengkelAI adalah platform AI terdepan untuk perawatan motor. Dapatkan diagnosa AI, cari bengkel terdekat, reminder perawatan, dan estimasi harga spare parts dengan mudah." },
    { name: "keywords", content: "bengkel motor, AI diagnosa motor, perawatan motor, spare parts motor, bengkel terdekat, reminder servis motor, estimasi harga motor" },
    { name: "author", content: "BengkelAI Team" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#0891b2" },
    
    // Open Graph tags
    { property: "og:type", content: "website" },
    { property: "og:title", content: "BengkelAI - Platform AI untuk Perawatan Motor Terpercaya" },
    { property: "og:description", content: "Platform AI terdepan untuk perawatan motor. Diagnosa AI, cari bengkel terdekat, reminder perawatan, dan estimasi harga spare parts." },
    { property: "og:image", content: "/og-image.jpg" },
    { property: "og:url", content: "https://bengkelai.com" },
    { property: "og:site_name", content: "BengkelAI" },
    { property: "og:locale", content: "id_ID" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "BengkelAI - Platform AI untuk Perawatan Motor" },
    { name: "twitter:description", content: "Platform AI terdepan untuk perawatan motor. Diagnosa AI, cari bengkel terdekat, reminder perawatan." },
    { name: "twitter:image", content: "/og-image.jpg" },
    
    // Additional SEO tags
    { name: "application-name", content: "BengkelAI" },
    { name: "apple-mobile-web-app-title", content: "BengkelAI" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "format-detection", content: "telephone=no" },
    { name: "msapplication-TileColor", content: "#0891b2" },
    { name: "msapplication-config", content: "/browserconfig.xml" },
  ];
};

export default function App() {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/16x16.svg" type="image/svg+xml" />
        <link rel="icon" href="/32x32.svg" sizes="32x32" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/48x48.svg" />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-950 text-white antialiased overflow-x-hidden">
        {/* Glass Background Gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,#1f2937_0%,#0b1220_60%)] -z-10" />
        
        {/* Subtle Noise Overlay */}
        <div className="fixed inset-0 opacity-[0.015] bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSI3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ3IiBjeT0iNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjciIGN5PSIyNyIgcj0iMSIvPjxjaXJjbGUgY3g9IjI3IiBjeT0iMjciIHI9IjEiLz48Y2lyY2xlIGN4PSI0NyIgY3k9IjI3IiByPSIxIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjQ3IiByPSIxIi8+PGNpcmNsZSBjeD0iMjciIGN5PSI0NyIgcj0iMSIvPjxjaXJjbGUgY3g9IjQ3IiBjeT0iNDciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==)] -z-10" />
        
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
