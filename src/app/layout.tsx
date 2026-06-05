import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { db } from "@/lib/db";
import { ProfileProvider } from "@/components/providers/ProfileProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await db.personalInfo.findUnique({ where: { id: "default" } });
  const name = profile?.name || "Aspiring Data Scientist";
  return {
    title: `${name} — Aspiring Data Scientist & AI Engineer Portfolio`,
    description:
      "Portfolio of an Engineering Graduate building expertise in Data Science, Machine Learning, and AI. View projects, skills, certifications, and learning journey.",
    keywords: [
      "Data Scientist",
      "AI Engineer",
      "Machine Learning",
      "Portfolio",
      "Data Analytics",
      "Python",
      "Power BI",
    ],
    openGraph: {
      title: `${name} — Data Science & AI Portfolio`,
      description:
        "Explore my journey into Data Science and AI — featuring projects, dashboards, certifications, and an interactive skills roadmap.",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${name} — Data Science & AI Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} — Data Science & AI Portfolio`,
      description:
        "Explore my journey into Data Science and AI — featuring projects, dashboards, certifications, and an interactive skills roadmap.",
      images: ["/og-image.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the profile data on the Server Side! This makes it completely instantaneous!
  const profile = await db.personalInfo.findUnique({ where: { id: "default" } });

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary-hover"
        >
          Skip to content
        </a>
        <ProfileProvider initialProfile={profile}>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
