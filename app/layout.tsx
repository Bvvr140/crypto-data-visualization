import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Token Explorer Pro - DeFi Discovery Platform',
  description: 'Simple DeFi token discovery platform built with Next.js, TypeScript, and Tailwind CSS',
  keywords: ['DeFi', 'tokens', 'Solana', 'cryptocurrency', 'trading'],
  authors: [{ name: 'Token Explorer Pro' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Token Explorer Pro',
    description: 'Discover and analyze DeFi tokens on Solana',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Explorer Pro',
    description: 'Discover and analyze DeFi tokens on Solana',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}