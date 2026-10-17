import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
