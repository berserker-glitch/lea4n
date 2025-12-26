import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Use Cases - How Students Use Lea4n",
    description: "Discover how students use Lea4n for exam preparation, essay writing, concept clarification, and more. See real use cases for AI-powered learning.",
    keywords: [
        "AI study use cases",
        "how to use AI for studying",
        "AI homework help",
        "exam preparation AI",
        "essay writing help",
        "concept clarification",
        "study scenarios",
    ],
    openGraph: {
        title: "Use Cases - How Students Use Lea4n",
        description: "See real-world examples of how students study smarter with AI.",
        url: "https://lea4n.com/use-cases",
    },
};

export default function UseCasesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
