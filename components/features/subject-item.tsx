"use client";

import { cn } from "@/lib/utils";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight, FolderOpen, Folder, Plus, MoreHorizontal, Pin } from "lucide-react";
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
    onConversationSelect?: (conversationId: string) => void;
    onNewConversation?: (subjectId: string) => void;
    onTogglePin?: (subjectId: string) => void;
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
    onNewConversation,
    onTogglePin,
}: SubjectItemProps) {
    const [isOpen, setIsOpen] = useState(isActive);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-1">
            <div className="group flex items-center gap-1 rounded-lg hover:bg-muted/40 transition-colors pr-1">
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-9 flex-1 justify-start gap-3 pl-2.5 font-medium transition-all",
                            isActive ? "text-foreground bg-muted/60" : "text-muted-foreground hover:text-foreground"
                        )}
                        onClick={(e) => {
                            if (!isOpen) setIsOpen(true);
                            onSelect?.(id);
                        }}
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
                </CollapsibleTrigger>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNewConversation?.(id);
                        }}
                    >
                        <Plus className="h-3.5 w-3.5" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
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

            <CollapsibleContent>
                <div className="relative ml-3.5 pl-3 pt-0.5 pb-1 space-y-0.5">
                    {conversations.length === 0 ? (
                        <p className="py-2 text-[11px] text-muted-foreground/60 italic pl-1">
                            No conversations yet
                        </p>
                    ) : (
                        conversations.map((conversation) => (
                            <Button
                                key={conversation.id}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-8 w-full justify-start px-2 text-sm font-normal transition-colors",
                                    activeConversationId === conversation.id
                                        ? "bg-muted text-foreground font-medium"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                onClick={() => onConversationSelect?.(conversation.id)}
                            >
                                <span className="truncate">{conversation.title}</span>
                                {activeConversationId === conversation.id && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </Button>
                        ))
                    )}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}
