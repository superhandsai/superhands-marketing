import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { PostHogProvider } from "@/providers/posthog-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const roobert = localFont({
  src: [
    {
      path: "../../public/fonts/RoobertTRIAL-Medium-BF67243fd53e059.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/RoobertTRIAL-SemiBold-BF67243fd54213d.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-roobert",
  display: "swap",
});

const roobertMono = localFont({
  src: "../../public/fonts/RoobertMonoTRIAL-SemiBold-BF67243fd2c0028.otf",
  weight: "600",
  variable: "--font-roobert-mono",
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://superhands.ai"),
  title: "Superhands — AI builds faster than design can direct it",
  description:
    "Superhands directs design at build time, catches issues early and feeds decisions back into future work so quality can scale.",
  openGraph: {
    title: "Superhands — AI builds faster than design can direct it",
    description:
      "Superhands directs design at build time, catches issues early and feeds decisions back into future work so quality can scale.",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Superhands — AI builds faster than design can direct it",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superhands — AI builds faster than design can direct it",
    description:
      "Superhands directs design at build time, catches issues early and feeds decisions back into future work so quality can scale.",
    images: ["/images/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", sizes: "any" },
    ],
    shortcut: "/favicon.svg?v=3",
    apple: "/favicon.ico?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const intercomAppId = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${roobert.variable} ${roobertMono.variable}`}>
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <PostHogProvider>
          <main className="flex-1">
            {children}
          </main>
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
