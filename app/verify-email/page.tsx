"use client";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { authApi } from "@/lib/api";

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const emailParam = searchParams.get("email") || "";

    const [email, setEmail] = useState(emailParam);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    // Handle cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Take only last character
        setOtp(newOtp);
        setError(null);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
    };

    const handleVerify = async () => {
        const otpString = otp.join("");
        if (otpString.length !== 6) {
            setError("Please enter the complete 6-digit code");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await authApi.verifyEmail({ email, otp: otpString });
            setSuccess(true);
            setTimeout(() => {
                router.push("/setup");
            }, 1500);
        } catch (err: any) {
            setError(err.message || "Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        setIsResending(true);
        setError(null);

        try {
            await authApi.resendOTP({ email });
            setResendCooldown(60);
        } catch (err: any) {
            setError(err.message || "Failed to resend code. Please try again.");
        } finally {
            setIsResending(false);
        }
    };

    if (success) {
        return (
            <AuthSplitLayout
                title="Email Verified!"
                description="Your email has been successfully verified"
                testimonial={{
                    quote: "The verification was quick and seamless. I was up and running with my studies in no time!",
                    author: "Sarah Johnson",
                    role: "Medical Student, Stanford"
                }}
            >
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center animate-pulse">
                        <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-muted-foreground text-center">
                        Redirecting to setup...
                    </p>
                </div>
            </AuthSplitLayout>
        );
    }

    return (
        <AuthSplitLayout
            title="Verify Your Email"
            description="Enter the 6-digit code we sent to your email"
            testimonial={{
                quote: "The verification was quick and seamless. I was up and running with my studies in no time!",
                author: "Sarah Johnson",
                role: "Medical Student, Stanford"
            }}
        >
            <div className="grid gap-6">
                <div className="flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                </div>

                {!emailParam && (
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-background"
                        />
                    </div>
                )}

                {emailParam && (
                    <p className="text-center text-sm text-muted-foreground">
                        Code sent to <span className="font-medium text-foreground">{email}</span>
                    </p>
                )}

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md text-center">
                        {error}
                    </div>
                )}

                {/* OTP Input */}
                <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                        <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="w-12 h-14 text-center text-xl font-bold bg-background border-2 focus:border-primary focus:ring-primary"
                            disabled={isLoading}
                        />
                    ))}
                </div>

                <Button
                    onClick={handleVerify}
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full shadow-lg shadow-primary/20"
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Email
                </Button>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                        Didn&apos;t receive the code?
                    </p>
                    <Button
                        variant="ghost"
                        onClick={handleResend}
                        disabled={isResending || resendCooldown > 0}
                        className="text-primary hover:text-primary/80"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : resendCooldown > 0 ? (
                            `Resend in ${resendCooldown}s`
                        ) : (
                            "Resend Code"
                        )}
                    </Button>
                </div>
            </div>
        </AuthSplitLayout>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
