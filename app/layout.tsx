import type { Metadata } from "next";
import localFont from "next/font/local";

import Navbar from "../components/Navbar";
import Background from "../components/Background";
import "./style.css";

const playfair = localFont({
  src: "../fonts/PlayfairDisplay-VariableFont_wght.ttf",
  variable: "--font-playfair",
  weight: "300 900",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={playfair.variable}>
        <Background />

        <div className="relative z-10 min-h-screen text-white">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
