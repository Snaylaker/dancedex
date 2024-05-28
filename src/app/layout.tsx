import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "DanceDex",
  description: "Dance more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"bg-neutral-900" + inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
