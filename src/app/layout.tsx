import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";
import { ThemeEditor } from "@/components/ThemeEditor";
import { BackToTop } from "@/components/BackToTop";
import { site } from "@/lib/site";
import { defaultTheme, savedThemeScript, showThemeEditor, themeCss } from "@/lib/theme";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const heading = Sora({ variable: "--font-heading", subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: defaultTheme.background,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: site.address,
  url: site.url,
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "1000" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the saved-theme script may set CSS variables on <html> before React hydrates.
    <html lang="en" className={`${body.variable} ${heading.variable} antialiased`} suppressHydrationWarning>
      <head>
        <style id="theme" dangerouslySetInnerHTML={{ __html: themeCss(defaultTheme) }} />
        {showThemeEditor && <script dangerouslySetInnerHTML={{ __html: savedThemeScript() }} />}
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileBookBar />
        {/* Sits above the mobile booking bar, and above the theme editor button when that is shown. */}
        <BackToTop className={showThemeEditor ? "bottom-[9.5rem] lg:bottom-20" : "bottom-24 lg:bottom-6"} />
        {showThemeEditor && <ThemeEditor />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
