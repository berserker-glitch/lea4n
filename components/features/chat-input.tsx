"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Mic } from "lucide-react";
import { useState, useRef, KeyboardEvent } from "react";

interface ChatInputProps {
    onSend?: (message: string) => void;
    onAttach?: () => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function ChatInput({
    onSend,
    onAttach,
    placeholder = "Message Lea4n...",
    disabled,
    className,
}: ChatInputProps) {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend?.(message.trim());
            setMessage("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
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

    return (
        <div
            className={cn(
                "relative flex items-end gap-2 rounded-[26px] border border-border/60 bg-muted/40 p-3 shadow-sm transition-all hover:border-border/80 focus-within:border-primary/30 focus-within:bg-background focus-within:ring-4 focus-within:ring-primary/5",
                className
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={onAttach}
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={placeholder}
                disabled={disabled}
                className="min-h-[24px] max-h-[200px] flex-1 resize-none border-0 bg-transparent py-2.5 px-2 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
                rows={1}
            />
            <div className="flex items-center gap-1 shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                    <Mic className="h-5 w-5" />
                </Button>
                <Button
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-sm"
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
