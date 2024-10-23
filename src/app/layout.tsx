import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Navbar } from "../../components/Navbar";
import Script from "next/script";
import { dmSans, poppins } from "../app/fonts/fonts";

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
        className={`${dmSans.variable} ${poppins.variable} antialiased font-dmSans`}
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
