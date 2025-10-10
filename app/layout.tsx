// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css'; // keep your existing global styles path if different
import { Inter, Sora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'PulsePilot',
  description: 'Roadmaps & feedback dashboard',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans bg-bg text-fg`}>
        {children}
      </body>
    </html>
  );
}
