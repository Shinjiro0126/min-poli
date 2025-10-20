import type { Metadata } from "next";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import Providers from "./providers";
import "@/app/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

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
      <head>
        {/* <Script async src="https://www.googletagmanager.com/gtag/js?id=G-S4WX9MPBJ8"></Script>
        <Script>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-S4WX9MPBJ8');
          `}
        </Script> */}
      </head>
      <body
        className={`${reggaeOne.variable} ${zenKurenaido.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-stone-50 flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
