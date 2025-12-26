"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthSplitLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    image?: React.ReactNode;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
}

export function AuthSplitLayout({
    children,
    title,
    description,
    testimonial,
}: AuthSplitLayoutProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background py-10 px-4">
            {/* Full Screen Background Patterns (Matching Landing Page) */}
            <div className="absolute inset-0 -z-10">
                {/* Main gradient orbs */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-chart-4/30 via-chart-4/20 to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-chart-3/10 via-transparent to-chart-1/10 blur-3xl animate-pulse-slow animation-delay-4000" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* Floating Glass Card container */}
            <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-border/50 shadow-2xl animate-fade-in-up bg-card/40 backdrop-blur-xl">

                {/* Left Side - Testimonial/Brand */}
                <div className="hidden lg:flex flex-col justify-between p-10 lg:p-12 bg-primary/5 border-r border-border/50 relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

                    <div className="relative z-10">
                        <Logo className="scale-110 origin-left" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        {testimonial ? (
                            <blockquote className="space-y-6">
                                <div className="flex gap-1 text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="text-2xl font-medium leading-relaxed tracking-tight">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                                <footer>
                                    <div className="font-bold text-lg">{testimonial.author}</div>
                                    <div className="text-muted-foreground">{testimonial.role}</div>
                                </footer>
                            </blockquote>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold">Study smarter, not harder</h2>
                                <ul className="space-y-4">
                                    {[
                                        "AI-powered document understanding",
                                        "Subject-specific memory",
                                        "Personalized quiz generation",
                                        "24/7 Virtual Tutor"
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-lg font-medium">
                                            <div className="rounded-full bg-primary/10 p-1">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative z-10 text-sm text-muted-foreground font-medium">
                        © {new Date().getFullYear()} Lea4n Inc.
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-card/60 relative">
                    {/* Mobile Header */}
                    <div className="lg:hidden absolute top-6 left-6">
                        <Logo size="sm" />
                    </div>

                    <div className="w-full max-w-sm space-y-8">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                            <p className="text-muted-foreground">
                                {description}
                            </p>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
