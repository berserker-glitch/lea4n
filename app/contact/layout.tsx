import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Get in Touch",
    description: "Have questions about Lea4n? Contact our support team for help with your AI study assistant, partnerships, or feedback. We typically respond within 24 hours.",
    keywords: [
        "contact Lea4n",
        "AI study support",
        "customer service",
        "help desk",
        "study app support",
    ],
    openGraph: {
        title: "Contact Lea4n - Get in Touch",
        description: "Reach out to our team for support, partnerships, or just to say hello.",
        url: "https://lea4n.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
