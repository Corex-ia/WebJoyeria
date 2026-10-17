import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Joyería Oasis — Joyas de Oro en Guatemala",
  description: "Fabricamos joyas de oro 10k en Guatemala. Aretes, studs, colecciones Primavera, Kids, Aurea y más. Envíos a todo el país.",
  keywords: "joyería, oro, Guatemala, aretes, studs, joyería guatemalteca",
  openGraph: {
    title: "Joyería Oasis",
    description: "Joyas de oro 10k hechas en Guatemala",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
