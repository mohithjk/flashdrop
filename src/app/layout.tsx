import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { AuthGuard } from "@/components/AuthGuard";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlashDrop | Luxury Tech",
  description: "High-end Ephemeral E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground">
        <AuthGuard>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthGuard>
      </body>
    </html>
  );
}
