// /app/layout.tsx
// Next.js ရဲ့ အဓိက layout ဖိုင်ပါ။ Font, background color နဲ့ عمومي styling တွေကို ဒီမှာ သတ်မှတ်ပါတယ်။

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CamCompare MM",
  description: "Myanmar Camera & Lens Price Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <main className="container mx-auto p-4 md:p-8">
            {children}
        </main>
      </body>
    </html>
  );
}
