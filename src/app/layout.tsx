import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solanisation",
  description: "Solanisation - Solana GPT for Solana Devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "min-h-screen antialiased")}>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
