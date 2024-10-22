import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Navbar } from "../../components/Navbar";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Echo Chamber",
  description:
    "Echo chamber is an online chatting app to chat with your friends and family. Just log in, and you're ready to chat with your close ones.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <NextTopLoader showSpinner={false} />
          <Navbar />
          {children}
        </SessionWrapper>

        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
