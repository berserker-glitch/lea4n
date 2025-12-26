import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read Lea4n's terms of service. Understand your rights and responsibilities when using our AI-powered learning platform.",
    openGraph: {
        title: "Terms of Service - Lea4n",
        description: "Terms and conditions for using Lea4n.",
        url: "https://lea4n.com/terms",
    },
    robots: {
        index: true,
        follow: false,
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
