import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Longyi Jewellery | Natural Stone. Naturally Unique.", template: "%s | Longyi Jewellery" },
  description: "Discover Feizhoucui jewelry for modern everyday wear.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<Footer /></body>
    </html>
  );
}
