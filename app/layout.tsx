import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/app/react-query-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Open Artifacts",
  description: "Create and Share Artifacts with Claude and other models",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ClerkProvider>
          <ReactQueryProvider>
            {children}

            <Toaster />
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
