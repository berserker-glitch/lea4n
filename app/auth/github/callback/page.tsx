"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "lea4n_token";
const USER_STORAGE_KEY = "lea4n_user";

export default function GitHubCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            const code = searchParams.get("code");

            if (!code) {
                setError("No authorization code received from GitHub");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/auth/github/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    setError(data.error?.message || "GitHub authentication failed");
                    return;
                }

                // Store token and user
                if (typeof window !== "undefined") {
                    localStorage.setItem(TOKEN_KEY, data.data.token);
                    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.data.user));
                }

                // Redirect based on setup status
                if (!data.data.user.setupCompleted) {
                    router.push("/setup");
                } else {
                    router.push("/dashboard");
                }
            } catch (err) {
                console.error("GitHub callback error:", err);
                setError("Network error. Please try again.");
            }
        };

        handleCallback();
    }, [searchParams, router]);

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Authentication Failed</h1>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <a href="/login" className="text-primary hover:underline">
                        Return to login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Completing GitHub authentication...</p>
            </div>
        </div>
    );
}
