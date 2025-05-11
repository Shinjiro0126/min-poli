import type { Metadata } from "next";
import Header from "@/app/component/Header";
import "@/app/globals.css";

import {
  geistSans,
  geistMono,
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Reggae+One&family=Zen+Kurenaido&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=nature_people" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-stone-50`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
