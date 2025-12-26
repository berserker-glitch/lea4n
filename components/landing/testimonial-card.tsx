"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    author: {
        name: string;
        role: string;
        avatar?: string;
    };
    rating?: number;
    className?: string;
    index?: number;
}

export function TestimonialCard({
    quote,
    author,
    rating = 5,
    className,
    index = 0,
}: TestimonialCardProps) {
    const initials = author.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    // Generate a consistent color based on initials
    const colors = [
        "from-primary to-chart-4",
        "from-chart-4 to-chart-3",
        "from-chart-3 to-chart-1",
        "from-chart-1 to-primary",
    ];
    const colorIndex = initials.charCodeAt(0) % colors.length;

    return (
        <Card
            className={cn(
                "group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1 bg-card/50 backdrop-blur-sm",
                className
            )}
        >
            {/* Quote decoration */}
            <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="h-20 w-20 text-primary" />
            </div>

            <CardContent className="p-6 relative z-10">
                {/* Stars with animation */}
                <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "h-5 w-5 transition-all duration-300",
                                i < rating
                                    ? "fill-chart-5 text-chart-5"
                                    : "fill-muted text-muted"
                            )}
                            style={{
                                transitionDelay: `${i * 50}ms`,
                                transform: i < rating ? 'scale(1)' : 'scale(0.9)'
                            }}
                        />
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base leading-relaxed mb-6 text-foreground/90">
                    &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-border group-hover:ring-primary/30 transition-all duration-300">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback className={cn(
                            "bg-gradient-to-br text-white text-sm font-medium",
                            colors[colorIndex]
                        )}>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                            {author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{author.role}</p>
                    </div>
                </div>
            </CardContent>

            {/* Bottom gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
    );
}
