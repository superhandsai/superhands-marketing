import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
  description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with SUPERHANDS.",
  openGraph: {
    title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
    description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with SUPERHANDS.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SUPERHANDS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
    description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with SUPERHANDS.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "any" },
      { url: "./favicon.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "./favicon.ico",
    apple: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
