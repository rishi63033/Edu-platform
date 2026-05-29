import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduPlatform – Student Dashboard",
  description: "Next-gen learning dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#080b12] text-slate-200 antialiased min-h-screen">{children}</body>
    </html>
  );
}
