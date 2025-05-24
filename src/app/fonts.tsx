import { Geist, Geist_Mono, Reggae_One, Zen_Kurenaido } from "next/font/google";

export const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const reggaeOne = Reggae_One({
  weight: "400",           // ← これが必須
  subsets: ["latin"],
  display: "optional",
  variable: "--font-reggae",
});

export const zenKurenaido = Zen_Kurenaido({
  weight: "400",           // ← これも必須
  subsets: ["latin"],
  display: "optional",
  variable: "--font-zen",
});