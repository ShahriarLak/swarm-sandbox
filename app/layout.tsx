import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/ui/footer";
import { Navbar } from "@/components/ui/navbar";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
