"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, FileText, Brain, Lightbulb } from "lucide-react";

interface ChatWelcomeProps {
    userName?: string;
    onSuggestionClick?: (suggestion: string) => void;
    className?: string;
}

const suggestions = [
    {
        icon: BookOpen,
        title: "Explain a concept",
        prompt: "Can you explain the concept of...",
    },
    {
        icon: FileText,
        title: "Summarize notes",
        prompt: "Summarize the key points from my notes about...",
    },
    {
        icon: Brain,
        title: "Quiz me",
        prompt: "Create a quiz to test my understanding of...",
    },
    {
        icon: Lightbulb,
        title: "Study tips",
        prompt: "What are the best strategies to study for...",
    },
];

export function ChatWelcome({
    userName = "there",
    onSuggestionClick,
    className,
}: ChatWelcomeProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center h-full px-4 py-12 animate-in fade-in duration-500",
                className
            )}
        >
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 shadow-xl backdrop-blur-sm">
                    <GraduationCap className="w-10 h-10 text-primary" />
                </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-3 text-foreground tracking-tight">
                Welcome back, {userName}!
            </h1>
            <p className="text-muted-foreground text-center max-w-md mb-10 text-base leading-relaxed">
                I&apos;m your personal AI tutor. I can explain complex topics, summarize your notes, or create practice quizzes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {suggestions.map((suggestion, i) => (
                    <Button
                        key={suggestion.title}
                        variant="outline"
                        className="h-auto p-4 justify-start gap-4 text-left hover:bg-muted/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-200 border-muted-foreground/10 bg-card/50 backdrop-blur-sm"
                        onClick={() => onSuggestionClick?.(suggestion.prompt)}
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <suggestion.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground text-sm mb-0.5">{suggestion.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 font-normal opacity-80">
                                {suggestion.prompt}
                            </p>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}
