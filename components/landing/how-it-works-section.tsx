"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Upload, FolderKanban, MessageCircle, Trophy } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface HowItWorksSectionProps {
    className?: string;
}

const steps = [
    {
        number: "01",
        icon: Upload,
        title: "Upload Your Materials",
        description:
            "Drop your PDFs, notes, textbooks, and study materials. We handle all common file formats seamlessly.",
        color: "from-chart-1/20 to-chart-1/5",
        iconColor: "text-chart-1",
    },
    {
        number: "02",
        icon: FolderKanban,
        title: "Organize by Subject",
        description:
            "Create subjects and organize your materials. Keep everything structured for easy access.",
        color: "from-chart-4/20 to-chart-4/5",
        iconColor: "text-chart-4",
    },
    {
        number: "03",
        icon: MessageCircle,
        title: "Start a Conversation",
        description:
            "Ask questions about your materials. Our AI provides accurate, context-aware answers.",
        color: "from-chart-3/20 to-chart-3/5",
        iconColor: "text-chart-3",
    },
    {
        number: "04",
        icon: Trophy,
        title: "Learn & Succeed",
        description:
            "Get summaries, explanations, and quizzes. Master your subjects and ace your exams.",
        color: "from-primary/20 to-primary/5",
        iconColor: "text-primary",
    },
];

export function HowItWorksSection({ className }: HowItWorksSectionProps) {
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
            id="how-it-works"
            ref={sectionRef}
            className={cn("py-24 md:py-32 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden", className)}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <Container>
                {/* Section header */}
                <div
                    className={cn(
                        "text-center mb-20 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        Simple Process
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-5">
                        How It{" "}
                        <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Get started in minutes. No complicated setup required.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={cn(
                                "relative group transition-all duration-700",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 z-0">
                                    <div
                                        className={cn(
                                            "h-full bg-gradient-to-r from-border to-transparent transition-all duration-1000",
                                            isVisible ? "w-full" : "w-0"
                                        )}
                                        style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                                    />
                                </div>
                            )}

                            {/* Step card */}
                            <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                                {/* Step number badge */}
                                <div className={cn(
                                    "flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 transition-transform duration-300 group-hover:scale-110",
                                    step.color
                                )}>
                                    <step.icon className={cn("h-8 w-8", step.iconColor)} />
                                </div>

                                {/* Number indicator */}
                                <div className="absolute top-4 right-4 text-5xl font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
                                    {step.number}
                                </div>

                                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
