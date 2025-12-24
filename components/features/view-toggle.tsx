"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FolderOpen } from "lucide-react";

interface ViewToggleProps {
    value: "chat" | "files";
    onChange?: (value: "chat" | "files") => void;
    className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
    return (
        <Tabs
            value={value}
            onValueChange={(v) => onChange?.(v as "chat" | "files")}
            className={className}
        >
            <TabsList className="grid w-full max-w-[280px] grid-cols-2 h-11 rounded-full p-1 bg-muted/50 border border-border/50">
                <TabsTrigger value="chat" className="rounded-full gap-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    <MessageSquare className="h-4 w-4" />
                    <span>AI Chat</span>
                </TabsTrigger>
                <TabsTrigger value="files" className="rounded-full gap-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary">
                    <FolderOpen className="h-4 w-4" />
                    <span>Files</span>
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
