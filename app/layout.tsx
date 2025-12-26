import type { Metadata, Viewport } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/lib/store";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

const catamaran = Catamaran({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE_URL = "https://lea4n.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lea4n - AI-Powered Learning Platform | Study Smarter with AI",
    template: "%s | Lea4n",
  },
  description:
    "Upload your study materials, organize by subject, and let AI help you understand everything. Lea4n is your personal AI tutor that remembers your learning preferences and helps you study smarter.",
  keywords: [
    "AI study",
    "AI tutor",
    "AI learning",
    "study assistant",
    "AI homework help",
    "learn with AI",
    "AI education",
    "study smarter",
    "AI powered learning",
    "online tutor",
    "exam preparation",
    "AI study assistant",
    "document upload",
    "OCR study",
    "Lea4n",
  ],
  authors: [{ name: "Lea4n Team", url: BASE_URL }],
  creator: "Lea4n",
  publisher: "Lea4n",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lea4n",
    title: "Lea4n - AI-Powered Learning Platform | Study Smarter with AI",
    description:
      "Upload your study materials, organize by subject, and let AI help you understand everything. Your personal AI tutor that remembers how you learn.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lea4n - AI-Powered Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lea4n - AI-Powered Learning Platform",
    description:
      "Study smarter with AI. Upload materials, chat with your AI tutor, and master any subject.",
    images: ["/og-image.png"],
    creator: "@lea4n",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: BASE_URL,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${catamaran.variable} font-sans antialiased bg-background text-foreground`}>
        <AppProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </AppProvider>
        <NoiseOverlay />
      </body>
    </html>
  );
}

