import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers - Join Our Team",
    description: "Join the Lea4n team and help build the future of AI-powered education. Explore open positions in engineering, design, and more.",
    keywords: [
        "Lea4n careers",
        "AI education jobs",
        "ed-tech jobs",
        "startup careers",
        "remote jobs education",
    ],
    openGraph: {
        title: "Careers at Lea4n - Join Our Team",
        description: "Help us build the future of AI-powered learning. See our open positions.",
        url: "https://lea4n.com/careers",
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
