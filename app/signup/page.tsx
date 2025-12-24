"use client";

import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { SocialButton } from "@/components/auth/social-button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreedToTerms) return;

        setIsLoading(true);
        setError(null);

        const result = await signup(name, email, password);

        if (result.error) {
            setError(result.error);
            setIsLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <AuthCard
            title="Create your account"
            description="Start your learning journey with Lea4n"
            footer={
                <p>
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md">
                        {error}
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                    <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with uppercase, lowercase, and number
                    </p>
                </div>
                <div className="flex items-start space-x-2">
                    <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                    <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </Label>
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !agreedToTerms}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <div className="relative my-4">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or continue with
                </span>
            </div>

            <div className="space-y-2">
                <SocialButton provider="google" />
                <SocialButton provider="github" />
            </div>
        </AuthCard>
    );
}
