import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "The Knight Owl - Checkmate your limits",  // Updated title
  description: "The Knight Owl connects young chess players with expert coaches, offering real-time collaboration, game analysis, and seamless booking to help players unlock their full potential.",  // Updated description
  keywords: "chess, chess players, chess coaches, online chess, chess training, learn chess, chess improvement, young chess players",  // SEO-friendly keywords
  // author: "The Knight Owl Team",  // Author name
  themeColor: "#000000",  // For browser UI theme color
  openGraph: {
    title: "The Knight Owl - Checkmate your limits",  // OpenGraph title for social sharing
    description: "The Knight Owl connects young chess players with expert coaches and offers powerful tools for chess improvement.",  // OpenGraph description
    url: "https://www.theknightowl.com",  // URL of the site (adjust with your actual site)
    siteName: "The Knight Owl",  // Site name
    images: [
      {
        url: "https://www.theknightowl.com/og-image.png",  // OG image URL (adjust with your actual image URL)
        width: 1200,
        height: 630,
        alt: "The Knight Owl - Checkmate your limits",  // Alt text for the image
      },
    ],
    type: "website",  // Type of content
  },
  twitter: {
    card: "summary_large_image",  // Twitter card type
    site: "@theknightowl",  // Twitter handle (adjust if needed)
    title: "The Knight Owl - Checkmate your limits",  // Twitter title
    description: "The Knight Owl connects young chess players with expert coaches to help them improve their skills and reach new heights in the game.",  // Twitter description
    images: "https://www.theknightowl.com/og-image.png",  // Twitter image URL (same as OG image)
  },
  robots: "index, follow",  // Allow search engines to index and follow links
};

const montserrat = Montserrat({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}