import type { Metadata } from "next";
import { Crimson_Text, Roboto_Mono } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSMPA Interactive Training Demo",
  description: "Interactive video training platform for BC slaughter licensing curriculum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${crimsonText.variable} ${robotoMono.variable} antialiased`}
        style={{ colorScheme: 'light' }}
      >
        {children}
      </body>
    </html>
  );
}
