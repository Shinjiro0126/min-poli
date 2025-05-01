import { Geist, Geist_Mono } from "next/font/google";
import { Zen_Kurenaido, Reggae_One } from "next/font/google";

export const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const zenKurenaido = Zen_Kurenaido({
  variable: '--font-zen-kurenaido',
  subsets: ['latin'],
  weight: '400',
});

export const reggaeOne = Reggae_One({
  variable: '--font-reggae-one',
  subsets: ['latin'],
  weight: '400',
});