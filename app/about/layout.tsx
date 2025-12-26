import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Our Mission & Story",
    description: "Learn about Lea4n's mission to make AI-powered education accessible. Discover our story, values, and the team behind your personal AI study assistant.",
    keywords: [
        "about Lea4n",
        "AI education company",
        "study app team",
        "education technology",
        "AI learning startup",
    ],
    openGraph: {
        title: "About Lea4n - AI-Powered Learning Platform",
        description: "Learn about our mission to make quality education accessible to everyone through AI.",
        url: "https://lea4n.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
