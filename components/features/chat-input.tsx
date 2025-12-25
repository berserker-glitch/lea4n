"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function ChatInput({
    onSend,
    placeholder = "Type a message...",
    disabled = false,
    className,
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (!message.trim() || disabled) return;
        onSend(message.trim());
        setMessage("");
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const hasMessage = message.trim().length > 0;

    return (
        <div
            className={cn(
                "relative flex items-end rounded-2xl border border-border/50 bg-muted/30 backdrop-blur-sm transition-all duration-200",
                "hover:border-border/80 focus-within:border-primary/50 focus-within:bg-background",
                "shadow-sm hover:shadow-md focus-within:shadow-md",
                className
            )}
        >
            {/* Left side actions - attach file */}
            <div className="flex items-center pl-3 pb-3">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                    disabled={disabled}
                    title="Attach file"
                >
                    <Paperclip className="h-4 w-4" />
                </Button>
            </div>

            {/* Textarea */}
            <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className={cn(
                    "flex-1 min-h-[48px] max-h-[200px] resize-none",
                    "border-0 bg-transparent py-3.5 px-2",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                    "text-sm leading-relaxed placeholder:text-muted-foreground/60"
                )}
            />

            {/* Right side actions - mic and send */}
            <div className="flex items-center gap-1 pr-2 pb-2.5">
                {!hasMessage && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                        disabled={disabled}
                        title="Voice input"
                    >
                        <Mic className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    type="button"
                    size="icon"
                    className={cn(
                        "h-9 w-9 rounded-xl transition-all duration-200",
                        hasMessage
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-100"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 scale-95"
                    )}
                    onClick={handleSend}
                    disabled={disabled || !hasMessage}
                    title="Send message"
                >
                    <Send className={cn("h-4 w-4 transition-transform", hasMessage && "-rotate-45")} />
                </Button>
            </div>
        </div>
    );
}
