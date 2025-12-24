"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface HeroProps {
    className?: string;
}

export function Hero({ className }: HeroProps) {
    return (
        <section
            className={cn(
                "relative overflow-hidden py-20 md:py-32",
                className
            )}
        >
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-chart-4/20 blur-3xl" />
            </div>

            <Container className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Learning Platform
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                    Learn Smarter,{" "}
                    <span className="text-primary">Not Harder</span>
                </h1>

                {/* Subheadline */}
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl mb-8">
                    Upload your study materials, organize by subject, and let AI help you
                    understand everything. Your personal study assistant is here.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/signup">
                        <Button size="xl" className="gap-2">
                            Start Learning Free
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="xl">
                            See How It Works
                        </Button>
                    </Link>
                </div>

                {/* Demo Image/Preview */}
                <div className="relative mx-auto max-w-5xl">
                    <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/50">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                                <div className="h-3 w-3 rounded-full bg-chart-2/60" />
                                <div className="h-3 w-3 rounded-full bg-chart-1/60" />
                            </div>
                            <div className="flex-1 text-center">
                                <span className="text-xs text-muted-foreground">
                                    lea4n.app/dashboard
                                </span>
                            </div>
                        </div>
                        <div className="aspect-[16/9] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                            <div className="text-center p-8">
                                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-primary" />
                                <p className="text-xl font-semibold mb-2">Dashboard Preview</p>
                                <p className="text-muted-foreground">
                                    Your organized study space awaits
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Floating decorative elements */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-xl bg-chart-1/20 backdrop-blur-sm border border-chart-1/30 flex items-center justify-center rotate-12 hidden md:flex">
                        <span className="text-2xl">📚</span>
                    </div>
                    <div className="absolute -top-4 -right-4 w-14 h-14 rounded-xl bg-chart-4/20 backdrop-blur-sm border border-chart-4/30 flex items-center justify-center -rotate-12 hidden md:flex">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-xl bg-chart-3/20 backdrop-blur-sm border border-chart-3/30 flex items-center justify-center rotate-6 hidden md:flex">
                        <span className="text-xl">✨</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
