import type { Metadata } from "next";
import Header from "@/app/component/Header";
import Providers from "./providers";
import "@/app/globals.css";

import {
  geistSans,
  geistMono,
  reggaeOne,
  zenKurenaido,
} from './fonts';


export const metadata: Metadata = {
  title: "みんなの政治",
  description: "政治をもっと身近に。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${reggaeOne.variable} ${zenKurenaido.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-stone-50`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
