"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { FeatureCard } from "./feature-card";
import {
    Upload,
    FolderOpen,
    MessageSquare,
    Brain,
    FileSearch,
    Zap,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface FeatureSectionProps {
    className?: string;
}

const features = [
    {
        icon: Upload,
        title: "Upload Anything",
        description:
            "PDFs, images, documents, and more. We support all common file formats for your study materials.",
    },
    {
        icon: FolderOpen,
        title: "Organize by Subject",
        description:
            "Keep your materials organized with subjects and folders. Find what you need instantly.",
    },
    {
        icon: MessageSquare,
        title: "AI Conversations",
        description:
            "Start conversations about your materials. Ask questions and get instant, accurate answers.",
    },
    {
        icon: Brain,
        title: "Smart Understanding",
        description:
            "Our AI reads and understands your documents, providing context-aware explanations.",
    },
    {
        icon: FileSearch,
        title: "Quick Search",
        description:
            "Search across all your materials instantly. Find that specific concept in seconds.",
    },
    {
        icon: Zap,
        title: "Study Faster",
        description:
            "Get summaries, quizzes, and explanations on demand. Learn more in less time.",
    },
];

export function FeatureSection({ className }: FeatureSectionProps) {
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
            id="features"
            ref={sectionRef}
            className={cn("py-24 md:py-32 relative overflow-hidden", className)}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-chart-4/5 blur-3xl" />
            </div>

            <Container>
                {/* Section header */}
                <div
                    className={cn(
                        "text-center mb-16 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        <Zap className="h-4 w-4" />
                        Powerful Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-5">
                        Everything You Need to{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
                                Succeed
                            </span>
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Powerful features designed to make studying easier, faster, and more
                        effective. Built for students who want to excel.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={feature.title} {...feature} index={index} />
                    ))}
                </div>

                {/* Bottom highlight */}
                <div
                    className={cn(
                        "mt-16 text-center transition-all duration-700 delay-500",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">And much more...</span>{" "}
                        New features are being added regularly based on student feedback.
                    </p>
                </div>
            </Container>
        </section>
    );
}
