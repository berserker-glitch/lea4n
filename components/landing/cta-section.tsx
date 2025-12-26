"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface CTASectionProps {
    className?: string;
}

const benefits = [
    "Free to get started",
    "No credit card required",
    "Cancel anytime",
];

export function CTASection({ className }: CTASectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className={cn("py-24 md:py-32", className)}>
            <Container>
                <div
                    className={cn(
                        "relative overflow-hidden rounded-3xl p-8 md:p-16 lg:p-20 transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-chart-4 -z-10" />

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)] -z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_50%)] -z-10" />

                    {/* Floating decorations */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse-slow animation-delay-2000" />

                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] -z-10" />

                    <div className="relative z-10 text-center">
                        {/* Badge */}
                        <div
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white mb-8 transition-all duration-700 delay-100",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            <Sparkles className="h-4 w-4" />
                            Start Your Learning Journey
                        </div>

                        <h2
                            className={cn(
                                "text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-700 delay-200",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            Ready to Transform
                            <br />
                            Your Studies?
                        </h2>

                        <p
                            className={cn(
                                "mx-auto max-w-2xl text-white/80 text-lg md:text-xl mb-8 transition-all duration-700 delay-300",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            Join thousands of students who are already learning smarter with
                            Lea4n. Your AI study companion awaits.
                        </p>

                        {/* Benefits */}
                        <div
                            className={cn(
                                "flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 transition-all duration-700 delay-400",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-2 text-white/90">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                    <span className="text-sm font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div
                            className={cn(
                                "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                            )}
                        >
                            <Link href="/signup">
                                <Button
                                    size="xl"
                                    className="gap-2 bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base px-8 py-6"
                                >
                                    <Sparkles className="h-5 w-5" />
                                    Get Started Free
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button
                                    size="xl"
                                    variant="ghost"
                                    className="text-white hover:bg-white/10 hover:text-white transition-all duration-300 text-base px-8 py-6"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
