import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "./components/WalletProvider";
import { Navigation } from "./components/Navigation";

export const metadata: Metadata = {
  title: "Nightforce Intelligence",
  description: "The Private AI Operations Center for Midnight Builders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen">
        <WalletProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
