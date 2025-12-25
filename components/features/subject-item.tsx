"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, FolderOpen, Folder, MoreHorizontal, Pin } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Conversation {
    id: string;
    title: string;
    isPinned?: boolean;
}

interface SubjectItemProps {
    id: string;
    name: string;
    color?: string;
    conversations: Conversation[];
    isActive?: boolean;
    activeConversationId?: string;
    isPinned?: boolean;
    onSelect?: (subjectId: string) => void;
    onConversationSelect?: (subjectId: string, conversationId: string) => void;
    onTogglePin?: (subjectId: string) => void;
    onTogglePinConversation?: (subjectId: string, conversationId: string) => void;
    onDeleteConversation?: (conversationId: string) => void;
}

export function SubjectItem({
    id,
    name,
    color = "bg-primary",
    conversations,
    isActive,
    activeConversationId,
    isPinned,
    onSelect,
    onConversationSelect,
    onTogglePin,
    onTogglePinConversation,
    onDeleteConversation,
}: SubjectItemProps) {
    const [isOpen, setIsOpen] = useState(isActive);

    // Sort conversations: pinned first
    const sortedConversations = [...conversations].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            onSelect?.(id);
        }
    };

    return (
        <div className="w-full space-y-1">
            {/* Subject Header */}
            <div className="group flex items-center gap-1 rounded-lg hover:bg-muted/40 transition-colors pr-1">
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-9 flex-1 justify-start gap-3 pl-2.5 font-medium transition-all",
                        isActive ? "text-foreground bg-muted/60" : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={handleToggle}
                >
                    <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isActive ? "border-primary/20 bg-primary/10" : "border-transparent bg-transparent group-hover:bg-muted"
                    )}>
                        {isOpen ? (
                            <FolderOpen className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
                        ) : (
                            <Folder className={cn("h-3.5 w-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
                        )}
                    </div>
                    <span className="truncate flex-1 text-left">{name}</span>
                    {isPinned && <Pin className="h-3 w-3 text-muted-foreground/70 shrink-0 mr-1 rotate-45" />}
                    <ChevronRight
                        className={cn(
                            "h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-200",
                            isOpen && "rotate-90"
                        )}
                    />
                </Button>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="right" sideOffset={8} className="w-40 z-50">
                            <DropdownMenuItem onClick={() => onTogglePin?.(id)}>
                                {isPinned ? "Unpin Subject" : "Pin Subject"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>Rename Subject</DropdownMenuItem>
                            <DropdownMenuItem>Change Color</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete Subject
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Conversations List - Simple conditional rendering, no Radix animation */}
            {isOpen && (
                <div className="ml-3.5 pl-3 pt-0.5 pb-1 space-y-0.5">
                    {sortedConversations.length === 0 ? (
                        <p className="py-2 text-[11px] text-muted-foreground/60 italic pl-1">
                            No conversations yet
                        </p>
                    ) : (
                        sortedConversations.map((conversation) => (
                            <div key={conversation.id} className="group/conv flex items-center gap-1 min-w-0">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "h-8 min-w-0 flex-1 justify-start px-2 text-sm font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 overflow-hidden",
                                        activeConversationId === conversation.id
                                            ? "bg-muted text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                    onClick={() => onConversationSelect?.(id, conversation.id)}
                                >
                                    <span className="truncate text-left">{conversation.title}</span>
                                    {conversation.isPinned && <Pin className="h-2.5 w-2.5 text-muted-foreground/70 shrink-0 ml-1 rotate-45" />}
                                    {activeConversationId === conversation.id && (
                                        <div className="ml-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    )}
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground opacity-0 group-hover/conv:opacity-100 transition-opacity shrink-0"
                                        >
                                            <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" side="right" sideOffset={8} className="w-40 z-50">
                                        <DropdownMenuItem onClick={() => onTogglePinConversation?.(id, conversation.id)}>
                                            {conversation.isPinned ? "Unpin" : "Pin"}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Rename</DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={() => onDeleteConversation?.(conversation.id)}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
