import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moppehjälpen",
  description: "Service, reparationer, felsökning och styling för mopeder.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
