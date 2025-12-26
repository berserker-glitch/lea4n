"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
    index?: number;
}

export function FeatureCard({
    icon: Icon,
    title,
    description,
    className,
    index = 0,
}: FeatureCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Card
            ref={cardRef}
            className={cn(
                "group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 bg-card/50 backdrop-blur-sm",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <CardContent className="p-6 relative z-10">
                {/* Icon with animated background */}
                <div className="mb-5 relative">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    {/* Glow effect behind icon on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>

                <h3 className="mb-2 text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </CardContent>

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-chart-4/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
    );
}
