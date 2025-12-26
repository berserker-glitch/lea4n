import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Access Your Account",
    description: "Sign in to your Lea4n account to continue learning with your personal AI study assistant. Access your subjects, conversations, and uploaded materials.",
    keywords: [
        "login Lea4n",
        "sign in",
        "account access",
        "student login",
    ],
    openGraph: {
        title: "Login to Lea4n",
        description: "Access your personal AI study assistant and continue learning.",
        url: "https://lea4n.com/login",
    },
    robots: {
        index: false,
        follow: true,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
