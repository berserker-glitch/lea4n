"use client";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialButton } from "@/components/auth/social-button";
import { Separator } from "@/components/ui/separator";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGitHubLoading, setIsGitHubLoading] = useState(false);

    const handleGitHubAuth = async () => {
        setIsGitHubLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/github`);
            const data = await response.json();
            if (data.success && data.data?.authUrl) {
                window.location.href = data.data.authUrl;
            } else {
                setError("Failed to initiate GitHub authentication");
                setIsGitHubLoading(false);
            }
        } catch {
            setError("Network error. Please try again.");
            setIsGitHubLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const result = await login(email, password);

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            // Redirect based on verification/setup status
            if (!result.user.isEmailVerified) {
                router.push("/verify-email?email=" + encodeURIComponent(email));
            } else if (!result.user.setupCompleted) {
                router.push("/setup");
            } else {
                router.push("/dashboard");
            }
        }
    };

    return (
        <AuthSplitLayout
            title="Welcome back"
            description="Sign in to your account to continue learning"
            testimonial={{
                quote: "Lea4n entirely changed how I prepare for my medical exams. It's like having a tutor who knows exactly what I need to focus on.",
                author: "Sarah Jenkins",
                role: "Medical Student, Stanford"
            }}
        >
            <div className="grid gap-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-background"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-primary hover:text-primary/80"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <PasswordInput
                                id="password"
                                placeholder="••••••••"
                                disabled={isLoading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-background"
                                required
                            />
                        </div>
                        <Button disabled={isLoading} className="w-full shadow-lg shadow-primary/20">
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid gap-2">
                    <SocialButton
                        provider="github"
                        onClick={handleGitHubAuth}
                    />
                    {isGitHubLoading && (
                        <div className="flex justify-center">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    )}
                </div>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="underline underline-offset-4 hover:text-primary font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthSplitLayout>
    );
}
