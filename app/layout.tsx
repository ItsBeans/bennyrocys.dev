import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Analytics } from '@vercel/analytics/react';


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
  title: "Benny Rocys",
  description: "Software engineer in London. CS with AI at King's College. ML, web dev, chess, and good food.",
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: "Benny Rocys",
    description: "Software engineer in London. CS with AI at King's College.",
  },
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-50`}
      >
        <ThemeProvider defaultTheme="system" storageKey="benny-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}