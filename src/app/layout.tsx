import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { PostHogProvider } from "@/providers/posthog-provider";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
  description: "Get started in Cursor without all the technical complexity of local dev, GitHub and version control, with Superhands.",
  openGraph: {
    title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
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
    title: "SUPERHANDS - The easiest way to build and share prototypes in Cursor",
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
  const intercomAppId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

  return (
    <html lang="en" className={inter.variable}>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <PostHogProvider>
          <ThemeProvider>
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </PostHogProvider>
        {intercomAppId && (
          <>
            <Script
              id="intercom-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.intercomSettings = {
                    app_id: "${intercomAppId}"
                  };
                `,
              }}
            />
            <Script
              id="intercom-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${intercomAppId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
