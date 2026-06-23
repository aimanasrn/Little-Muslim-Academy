import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import type { ReactNode } from "react";
import { Providers } from "../components/auth/providers";
import "./globals.css";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Little Muslim Learning Adventure",
  description:
    "A game-style preschool Islamic learning adventure with worlds, rewards, and mini games."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
