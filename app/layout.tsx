import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { LayoutProvider } from "../components/LayoutProvider";
import ErrorBoundary from "../components/ErrorBoundary";
import PixelSnow from "../components/PixelSnow";

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TutorialAI",
  "description": "Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP, programowaniu oraz użyciu agentów AI.",
  "url": "https://tutorialai.pl",
  "publisher": {
    "@type": "Organization",
    "name": "TutorialAI",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutorialAI - Platforma Tutorialowa AI",
  description: "Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP, programowaniu oraz użyciu agentów AI.",
  keywords: ["AI", "tutorial", "inżynieria kontekstu", "MCP", "programowanie", "agenci AI", "JavaScript", "Python"],
  authors: [{ name: "TutorialAI Team" }],
  creator: "TutorialAI",
  publisher: "TutorialAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tutorialai.pl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TutorialAI - Platforma Tutorialowa AI",
    description: "Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP, programowaniu oraz użyciu agentów AI.",
    url: "https://tutorialai.pl",
    siteName: "TutorialAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TutorialAI - Platforma Tutorialowa AI",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorialAI - Platforma Tutorialowa AI",
    description: "Kompleksowa platforma tutorialowa poświęcona inżynierii kontekstu, narzędziom MCP, programowaniu oraz użyciu agentów AI.",
    images: ["/og-image.png"],
    creator: "@tutorialai",
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
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
          <PixelSnow
            color="#ffffff"
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={125}
            brightness={1}
          />
        </div>
        <div className="relative z-10">
          <ErrorBoundary>
             <LayoutProvider>
                <Suspense fallback={<div className="h-16 bg-black border-b border-gray-800"></div>}>
                  <Header />
                </Suspense>
                <div className="flex min-h-screen pt-16">
                  <Suspense fallback={<div className="w-64 bg-gray-900"></div>}>
                    <Sidebar />
                  </Suspense>
                  <main className="flex-1">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      {children}
                    </div>
                  </main>
                </div>
                <Suspense fallback={<div className="bg-gray-900 border-t border-gray-800"></div>}>
                  <Footer />
                </Suspense>
              </LayoutProvider>
            </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
