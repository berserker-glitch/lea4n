"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Sparkles, BookOpen, BrainCircuit, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeroProps {
    className?: string;
}



export function Hero({ className }: HeroProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            className={cn(
                "relative overflow-hidden py-24 md:py-40 lg:py-48",
                className
            )}
        >
            {/* Animated background gradients */}
            <div className="absolute inset-0 -z-10">
                {/* Main gradient orbs */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/30 via-primary/20 to-transparent blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-chart-4/30 via-chart-4/20 to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-chart-3/10 via-transparent to-chart-1/10 blur-3xl animate-pulse-slow animation-delay-4000" />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
            </div>

            <Container className="relative">
                <div className="text-center">
                    {/* Badge with glow effect */}
                    <div
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-primary mb-8 border border-primary/20 shadow-lg shadow-primary/5 transition-all duration-700",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>AI-Powered Learning Platform</span>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                    </div>

                    {/* Headline with gradient text */}
                    <h1
                        className={cn(
                            "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 transition-all duration-700 delay-100",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        Learn Smarter,{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-primary via-chart-4 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Not Harder
                            </span>
                            {/* Underline decoration */}
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,6 Q25,0 50,6 T100,6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p
                        className={cn(
                            "mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl lg:text-2xl mb-10 leading-relaxed transition-all duration-700 delay-200",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        Upload your study materials, organize by subject, and let AI help you
                        understand <span className="text-foreground font-medium">everything</span>.
                        Your personal study assistant is here.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={cn(
                            "flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        <Link href="/signup">
                            <Button size="xl" className="gap-2 text-base px-8 py-6 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
                                <Sparkles className="h-5 w-5" />
                                Start Learning Free
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#features">
                            <Button variant="outline" size="xl" className="text-base px-8 py-6 backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105">
                                See How It Works
                            </Button>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div
                        className={cn(
                            "flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16 transition-all duration-700 delay-400",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        {[
                            { value: "10K+", label: "Active Students" },
                            { value: "50K+", label: "Documents Processed" },
                            { value: "4.9", label: "Average Rating" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Demo Preview with glassmorphism */}
                    <div
                        className={cn(
                            "relative mx-auto max-w-5xl transition-all duration-1000 delay-500",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        {/* Glow effect behind the card */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-chart-4/20 to-primary/20 blur-3xl scale-110 -z-10" />

                        <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3 bg-muted/30 backdrop-blur-sm">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-destructive/60 hover:bg-destructive transition-colors" />
                                    <div className="h-3 w-3 rounded-full bg-chart-5/60 hover:bg-chart-5 transition-colors" />
                                    <div className="h-3 w-3 rounded-full bg-chart-1/60 hover:bg-chart-1 transition-colors" />
                                </div>
                                <div className="flex-1 text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-background/50 border border-border/50">
                                        <div className="h-3 w-3 rounded-full bg-chart-1/60" />
                                        <span className="text-xs text-muted-foreground">
                                            lea4n.app/dashboard
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard preview content - Enhanced */}
                            <div className="aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6">
                                <div className="flex h-full gap-4">
                                    {/* Sidebar */}
                                    <div className="w-1/4 space-y-3 hidden sm:block">
                                        {/* Logo area */}
                                        <div className="flex items-center gap-2 px-2 mb-4">
                                            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                                                <GraduationCap className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="h-4 rounded bg-white/20 w-16" />
                                        </div>

                                        {/* New Subject Button */}
                                        <div className="h-9 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 px-3">
                                            <div className="h-4 w-4 rounded bg-white/20" />
                                            <div className="h-3 rounded bg-white/15 w-20" />
                                        </div>

                                        {/* Subjects */}
                                        <div className="space-y-1.5 pt-2">
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/20 border border-primary/30">
                                                <div className="h-3 w-3 rounded-full bg-blue-400" />
                                                <div className="h-3 rounded bg-white/30 flex-1" />
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5">
                                                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                                <div className="h-3 rounded bg-white/15 w-3/4" />
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5">
                                                <div className="h-3 w-3 rounded-full bg-amber-400" />
                                                <div className="h-3 rounded bg-white/15 w-1/2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Chat Area */}
                                    <div className="flex-1 flex flex-col bg-slate-800/50 rounded-xl border border-white/5 overflow-hidden">
                                        {/* Header */}
                                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <BookOpen className="h-4 w-4 text-blue-400" />
                                                </div>
                                                <div>
                                                    <div className="h-3.5 rounded bg-white/25 w-24 mb-1.5" />
                                                    <div className="h-2.5 rounded bg-white/10 w-16" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div className="flex-1 p-4 space-y-4 overflow-hidden">
                                            {/* User message */}
                                            <div className="flex justify-end">
                                                <div className="max-w-[70%] bg-primary rounded-2xl rounded-br-md px-4 py-2.5">
                                                    <div className="h-3 rounded bg-white/30 w-40" />
                                                </div>
                                            </div>

                                            {/* AI Response */}
                                            <div className="flex gap-3">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center shrink-0">
                                                    <BrainCircuit className="h-4 w-4 text-white" />
                                                </div>
                                                <div className="flex-1 space-y-2 bg-white/5 rounded-2xl rounded-tl-md p-4 max-w-[80%]">
                                                    <div className="h-3 rounded bg-white/20 w-full" />
                                                    <div className="h-3 rounded bg-white/15 w-5/6" />
                                                    <div className="h-3 rounded bg-white/15 w-4/6" />
                                                    <div className="h-3 rounded bg-white/10 w-3/4" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Input */}
                                        <div className="p-3 border-t border-white/5">
                                            <div className="flex gap-2">
                                                <div className="flex-1 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center px-4">
                                                    <div className="h-3 rounded bg-white/10 w-32" />
                                                </div>
                                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                                                    <Zap className="h-4 w-4 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </Container>
        </section>
    );
}
