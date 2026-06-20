import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Arabian - Your Fellow Traveller",
  description: "Discover extraordinary travel experiences with Royal Arabian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
