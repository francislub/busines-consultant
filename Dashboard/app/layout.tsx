import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Matuga Dental Care",
  description: "The best dental clinic in Uganda. We provide quality dental services at an affordable price.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
