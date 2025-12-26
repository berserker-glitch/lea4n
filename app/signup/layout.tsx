import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up - Start Learning Free",
    description: "Create your free Lea4n account and start studying smarter with AI. Upload your materials, organize by subject, and get personalized learning assistance.",
    keywords: [
        "sign up Lea4n",
        "create account",
        "free AI tutor",
        "start studying",
        "AI learning account",
    ],
    openGraph: {
        title: "Sign Up for Lea4n - Start Learning Free",
        description: "Create your free account and start studying smarter with AI today.",
        url: "https://lea4n.com/signup",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
