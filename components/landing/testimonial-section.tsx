"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { TestimonialCard } from "./testimonial-card";
import { Star } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface TestimonialSectionProps {
    className?: string;
}

const testimonials = [
    {
        quote:
            "Lea4n completely changed how I study. I can upload all my lecture notes and ask questions anytime. It's like having a tutor available 24/7.",
        author: {
            name: "Sarah Chen",
            role: "Medical Student",
        },
        rating: 5,
    },
    {
        quote:
            "The organization features are incredible. I have all my subjects sorted, and the AI actually understands the context of my materials.",
        author: {
            name: "Marcus Johnson",
            role: "Engineering Student",
        },
        rating: 5,
    },
    {
        quote:
            "I was skeptical at first, but the AI's explanations are surprisingly accurate. It's saved me hours of re-reading dense textbooks.",
        author: {
            name: "Emily Roberts",
            role: "Law Student",
        },
        rating: 5,
    },
];

export function TestimonialSection({ className }: TestimonialSectionProps) {
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
        <section
            id="testimonials"
            ref={sectionRef}
            className={cn("py-24 md:py-32 relative overflow-hidden", className)}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-chart-5/5 blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <Container>
                {/* Section header */}
                <div
                    className={cn(
                        "text-center mb-16 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-chart-5/10 px-4 py-1.5 text-sm font-medium text-chart-5 mb-6">
                        <Star className="h-4 w-4 fill-chart-5" />
                        Student Reviews
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-5">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-chart-5 to-primary bg-clip-text text-transparent">
                            Students
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        See what students are saying about their learning experience with
                        Lea4n.
                    </p>
                </div>

                {/* Testimonials grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={cn(
                                "transition-all duration-700",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <TestimonialCard {...testimonial} index={index} />
                        </div>
                    ))}
                </div>

                {/* Trust indicators */}
                <div
                    className={cn(
                        "mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-700 delay-500",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-chart-5 text-chart-5" />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">4.9/5 Average Rating</p>
                    </div>
                    <div className="h-8 w-px bg-border hidden md:block" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">10,000+</p>
                        <p className="text-sm text-muted-foreground">Active Students</p>
                    </div>
                    <div className="h-8 w-px bg-border hidden md:block" />
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">95%</p>
                        <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
