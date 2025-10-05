import './globals.css';

export const metadata = {
  title: 'swarm-sandbox',
  description: 'demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
