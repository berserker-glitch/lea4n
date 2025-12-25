"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { feedbackApi } from "@/lib/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Copy, Check, ThumbsUp, ThumbsDown, Send, MessageSquareWarning, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
    messageId?: string; // Required for feedback functionality
    initialFeedback?: { isLiked: boolean } | null; // Initial feedback state from server
    timestamp?: Date;
    isLoading?: boolean;
    isStreaming?: boolean;
    sources?: {
        fileName: string;
        fileId: string;
        tag?: string;
        similarity?: number;
    }[];
}

const FEEDBACK_REASONS = [
    "Inaccurate information",
    "Not helpful",
    "Too long/short",
    "Confusing response",
    "Inappropriate content",
];

export function ChatMessage({
    role,
    content,
    messageId,
    initialFeedback,
    timestamp,
    isLoading,
    isStreaming,
    sources,
}: ChatMessageProps) {
    const isUser = role === "user";
    const [copied, setCopied] = useState(false);
    // Initialize liked state from server feedback
    const [liked, setLiked] = useState<boolean | null>(
        initialFeedback !== undefined ? (initialFeedback?.isLiked ?? null) : null
    );
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(initialFeedback !== null && initialFeedback !== undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleLike = async () => {
        if (!messageId) return;

        try {
            if (liked === true) {
                // Remove like
                await feedbackApi.delete(messageId);
                setLiked(null);
            } else {
                // Submit like
                await feedbackApi.submit({
                    messageId,
                    isLiked: true,
                });
                setLiked(true);
                setFeedbackSubmitted(false);
            }
        } catch (err) {
            console.error("Failed to submit like:", err);
        }
    };

    const handleDislike = () => {
        if (!messageId) return;

        if (liked === false) {
            // If already disliked, remove it
            feedbackApi.delete(messageId).then(() => {
                setLiked(null);
                setFeedbackSubmitted(false);
            }).catch(err => console.error("Failed to remove dislike:", err));
        } else {
            // Show feedback dialog when disliking
            setFeedbackDialogOpen(true);
        }
    };

    const toggleReason = (reason: string) => {
        setSelectedReasons((prev) =>
            prev.includes(reason)
                ? prev.filter((r) => r !== reason)
                : [...prev, reason]
        );
    };

    const handleSubmitFeedback = async () => {
        if (!messageId) return;

        setIsSubmitting(true);
        try {
            await feedbackApi.submit({
                messageId,
                isLiked: false,
                reasons: selectedReasons,
                feedback: feedbackText || undefined,
            });

            setLiked(false);
            setFeedbackSubmitted(true);
            setFeedbackDialogOpen(false);
            // Reset form
            setFeedbackText("");
            setSelectedReasons([]);
        } catch (err) {
            console.error("Failed to submit feedback:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseFeedback = () => {
        setFeedbackDialogOpen(false);
        // Reset form without submitting
        setFeedbackText("");
        setSelectedReasons([]);
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
                                    // Style code blocks with enhanced header
                                    code: ({ className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const language = match ? match[1] : '';
                                        const isInline = !className;

                                        if (isInline) {
                                            return (
                                                <code
                                                    className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[13px] font-mono font-medium"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }

                                        return (
                                            <code
                                                className={cn(
                                                    "block text-[13px] font-mono leading-relaxed",
                                                    className
                                                )}
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                    // Style pre blocks with header and copy
                                    pre: ({ children }) => {
                                        const codeElement = children as any;
                                        const className = codeElement?.props?.className || '';
                                        const match = /language-(\w+)/.exec(className);
                                        const language = match ? match[1] : 'code';
                                        const codeContent = codeElement?.props?.children || '';

                                        return (
                                            <div className="relative group/code my-4 rounded-xl overflow-hidden border border-border/50 bg-zinc-950 dark:bg-zinc-900">
                                                <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-border/30">
                                                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                                                        {language}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(String(codeContent).replace(/\n$/, ''));
                                                        }}
                                                        className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                        Copy
                                                    </button>
                                                </div>
                                                <pre className="overflow-x-auto p-4 text-zinc-100">
                                                    {children}
                                                </pre>
                                            </div>
                                        );
                                    },
                                    // Style headings
                                    h1: ({ children }) => (
                                        <h1 className="text-lg font-bold mt-4 mb-2 pb-1 border-b border-border/30">{children}</h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-base font-semibold mt-3 mb-1.5">{children}</h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-sm font-semibold mt-2 mb-1">{children}</h3>
                                    ),
                                    // Style paragraphs - compact
                                    p: ({ children }) => (
                                        <p className="my-1.5 leading-6">{children}</p>
                                    ),
                                    // Style lists - compact
                                    ul: ({ children }) => (
                                        <ul className="my-1.5 ml-4 space-y-0.5">{children}</ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-1.5 ml-4 space-y-0.5 list-decimal">{children}</ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="leading-6 flex items-start gap-2">
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    // Style blockquotes - compact
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-3 border-primary/60 bg-primary/5 pl-3 pr-2 py-1.5 my-2 rounded-r italic text-foreground/80 text-sm">
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
                {
                    !isUser && !isLoading && content && (
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
                    )
                }
            </div >

            {/* Feedback Dialog */}
            < Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquareWarning className="h-5 w-5 text-primary" />
                            Help Us Improve
                        </DialogTitle>
                        <DialogDescription>
                            Why did you dislike this response? Your feedback helps us improve.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Quick reason buttons */}
                        <div className="flex flex-wrap gap-2">
                            {FEEDBACK_REASONS.map((reason) => (
                                <Button
                                    key={reason}
                                    variant={selectedReasons.includes(reason) ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                        "transition-all",
                                        selectedReasons.includes(reason) && "bg-primary text-primary-foreground"
                                    )}
                                    onClick={() => toggleReason(reason)}
                                >
                                    {reason}
                                </Button>
                            ))}
                        </div>

                        {/* Additional feedback textarea */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Additional feedback (optional)
                            </label>
                            <Textarea
                                placeholder="Tell us more about what went wrong..."
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="ghost"
                            onClick={handleCloseFeedback}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitFeedback}
                            disabled={isSubmitting || (selectedReasons.length === 0 && !feedbackText.trim())}
                            className="gap-2"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                            {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    );
}
