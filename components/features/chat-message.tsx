"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
    timestamp?: Date;
    isLoading?: boolean;
    isStreaming?: boolean;
}

export function ChatMessage({
    role,
    content,
    timestamp,
    isLoading,
    isStreaming,
}: ChatMessageProps) {
    const isUser = role === "user";
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState<boolean | null>(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleLike = () => {
        setLiked(liked === true ? null : true);
    };

    const handleDislike = () => {
        setLiked(liked === false ? null : false);
    };

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
                        ) : isUser ? (
                            <p className="whitespace-pre-wrap m-0">{content}</p>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Style code blocks
                                    code: ({ className, children, ...props }) => {
                                        const isInline = !className;
                                        return isInline ? (
                                            <code
                                                className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        ) : (
                                            <code
                                                className={cn(
                                                    "block bg-muted/50 p-4 rounded-lg overflow-x-auto text-sm font-mono",
                                                    className
                                                )}
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                    // Style pre blocks
                                    pre: ({ children }) => (
                                        <pre className="bg-muted/50 rounded-lg overflow-x-auto my-3">
                                            {children}
                                        </pre>
                                    ),
                                    // Style headings
                                    h1: ({ children }) => (
                                        <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-lg font-semibold mt-3 mb-2">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>
                                    ),
                                    // Style paragraphs - more spacing for readability
                                    p: ({ children }) => (
                                        <p className="my-4 leading-relaxed">{children}</p>
                                    ),
                                    // Style lists
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="leading-relaxed">{children}</li>
                                    ),
                                    // Style blockquotes
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary/50 pl-4 my-2 italic text-muted-foreground">
                                            {children}
                                        </blockquote>
                                    ),
                                    // Style links
                                    a: ({ children, href }) => (
                                        <a
                                            href={href}
                                            className="text-primary underline hover:no-underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    // Style tables
                                    table: ({ children }) => (
                                        <div className="overflow-x-auto my-3">
                                            <table className="min-w-full border border-border rounded-lg">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    th: ({ children }) => (
                                        <th className="border-b border-border bg-muted/50 px-3 py-2 text-left font-semibold">
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children }) => (
                                        <td className="border-b border-border px-3 py-2">{children}</td>
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        )}
                        {isStreaming && (
                            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-0.5" />
                        )}
                    </div>
                </div>

                {/* Action buttons for AI messages */}
                {!isUser && !isLoading && content && (
                    <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={handleCopy}
                            title="Copy message"
                        >
                            {copied ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                                <Copy className="h-3.5 w-3.5" />
                            )}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-7 w-7 rounded-full",
                                liked === true
                                    ? "text-green-500 hover:text-green-600"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={handleLike}
                            title="Good response"
                        >
                            <ThumbsUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-7 w-7 rounded-full",
                                liked === false
                                    ? "text-red-500 hover:text-red-600"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={handleDislike}
                            title="Bad response"
                        >
                            <ThumbsDown className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
