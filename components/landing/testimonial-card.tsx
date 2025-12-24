import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    author: {
        name: string;
        role: string;
        avatar?: string;
    };
    rating?: number;
    className?: string;
}

export function TestimonialCard({
    quote,
    author,
    rating = 5,
    className,
}: TestimonialCardProps) {
    const initials = author.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <Card className={cn("", className)}>
            <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                "h-4 w-4",
                                i < rating
                                    ? "fill-chart-5 text-chart-5"
                                    : "fill-muted text-muted"
                            )}
                        />
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm leading-relaxed mb-4">
                    &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">{author.name}</p>
                        <p className="text-xs text-muted-foreground">{author.role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
