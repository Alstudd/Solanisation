import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solanisation GPT - Data Scraping & Vectorization",
  description: "Solanisation GPT - Data Scraping & Vectorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
