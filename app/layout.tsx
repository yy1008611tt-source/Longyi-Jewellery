import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "BRAND NAME | Natural Jewelry for Everyday", template: "%s | BRAND NAME" },
  description: "Naturally inspired bracelets, beaded necklaces, pendants, earrings and rings for everyday moments.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /></body>
    </html>
  );
}
