import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read Lea4n's privacy policy. Learn how we collect, use, and protect your personal information when you use our AI-powered learning platform.",
    openGraph: {
        title: "Privacy Policy - Lea4n",
        description: "How we handle and protect your data.",
        url: "https://lea4n.com/privacy",
    },
    robots: {
        index: true,
        follow: false,
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
