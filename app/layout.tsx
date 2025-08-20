import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Domain Map Dashboard",
  description: "Interactive domain & dataset map",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
