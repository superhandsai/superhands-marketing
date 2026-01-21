import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { PostHogProvider } from "@/providers/posthog-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Superhands - The easiest way to build and share prototypes in Cursor",
  description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with Superhands.",
  openGraph: {
    title: "Superhands - The easiest way to build and share prototypes in Cursor",
    description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with Superhands.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Superhands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superhands - The easiest way to build and share prototypes in Cursor",
    description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with Superhands.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.png?v=2", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.png?v=2",
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
        <PostHogProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
