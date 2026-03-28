import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import ClientLayout from "@/components/ClientLayout";
import { NavigationSection } from "@/types";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navigationSections: NavigationSection[] = [
  { id: 'hero', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'process', label: 'Process', href: '/#process' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const metadata: Metadata = {
  title: "SB Infra Projects | Premium Construction Services",
  description: "Building excellence through innovation and quality craftsmanship. Expert construction services for residential, commercial, and industrial projects.",
  keywords: ["construction", "building", "architecture", "SB Infra", "infrastructure"],
  authors: [{ name: "SB Infra Projects" }],
  icons: {
    icon: [
      { url: '/logo.jpeg', sizes: 'any' },
      { url: '/logo.jpeg', type: 'image/jpeg' },
    ],
    apple: '/logo.jpeg',
  },
  openGraph: {
    title: "SB Infra Projects | Premium Construction Services",
    description: "Building excellence through innovation and quality craftsmanship.",
    type: "website",
    images: ['/logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <ClientLayout>
            <Navigation sections={navigationSections} />
            <MobileBottomNav sections={navigationSections} />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
