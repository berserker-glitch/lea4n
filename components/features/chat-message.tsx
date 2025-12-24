"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
    isLoading?: boolean;
}

export function ChatMessage({
    role,
    content,
    timestamp,
    isLoading,
}: ChatMessageProps) {
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "group flex w-full gap-3 py-4",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <Avatar className={cn("h-8 w-8 shrink-0", isUser && "hidden")}>
                <AvatarFallback className="bg-primary/10 text-primary border border-primary/20">
                    <Bot className="h-4 w-4" />
                </AvatarFallback>
            </Avatar>

            <div className={cn(
                "flex max-w-[85%] flex-col gap-1",
                isUser ? "items-end" : "items-start"
            )}>
                <div className={cn(
                    "flex items-center gap-2 px-1",
                    isUser ? "flex-row-reverse" : "flex-row"
                )}>
                    <span className="text-xs font-medium text-muted-foreground">
                        {isUser ? "You" : "Lea4n AI"}
                    </span>
                    {timestamp && (
                        <span className="text-[10px] text-muted-foreground/60">
                            {timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    )}
                </div>

                <div
                    className={cn(
                        "relative px-5 py-3.5 text-sm shadow-sm",
                        isUser
                            ? "rounded-2xl rounded-tr-md bg-primary text-primary-foreground"
                            : "rounded-2xl rounded-tl-md bg-transparent text-foreground pl-0 shadow-none"
                    )}
                >
                    <div className="prose prose-sm dark:prose-invert max-w-none break-words leading-relaxed">
                        {isLoading ? (
                            <div className="flex items-center gap-1.5 py-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                                <div className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
                            </div>
                        ) : (
                            <p className="whitespace-pre-wrap m-0">{content}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
