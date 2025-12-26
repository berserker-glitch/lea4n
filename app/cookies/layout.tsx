import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy",
    description: "Learn about how Lea4n uses cookies and similar technologies on our AI-powered learning platform to enhance your experience.",
    openGraph: {
        title: "Cookie Policy - Lea4n",
        description: "How we use cookies on our platform.",
        url: "https://lea4n.com/cookies",
    },
    robots: {
        index: true,
        follow: false,
    },
};

export default function CookiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
