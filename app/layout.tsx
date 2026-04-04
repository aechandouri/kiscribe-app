import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiscribe — Notes kiné en 2 minutes | SOAPIE & codes AMK",
  description:
    "Kiscribe génère vos notes SOAPIE et codes AMK en 45 secondes de dictée. L'outil IA conçu pour les kinésithérapeutes libéraux français.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kiscribe",
  },
};

export const viewport: Viewport = {
  themeColor: "#5C7A5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" className="h-full">
        <head>
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        </head>
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
