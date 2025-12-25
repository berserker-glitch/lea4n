"use client";

import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
    MessageSquare,
    BookOpen,
    LayoutGrid,
    FileText,
    Check
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MODES = [
    {
        id: "ANSWER",
        label: "Answer",
        description: "Direct answers based on your study materials.",
        icon: MessageSquare,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        id: "EXPLAIN",
        label: "Explain",
        description: "Step-by-step explanations of concepts.",
        icon: BookOpen,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    {
        id: "QUIZ",
        label: "Quiz",
        description: "Practice questions based on your exams.",
        icon: LayoutGrid,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        id: "REVIEW",
        label: "Review",
        description: "Focused summaries of key material.",
        icon: FileText,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
] as const;

export function StudyModeSelector() {
    const { studyMode, setStudyMode } = useApp();

    const currentMode = MODES.find((m) => m.id === studyMode) || MODES[0];
    const Icon = currentMode.icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200 border border-border/50 bg-background/50 hover:bg-muted/50",
                    "shadow-sm hover:shadow"
                )}>
                    <div className={cn("p-1 rounded-full", currentMode.bgColor)}>
                        <Icon className={cn("h-3.5 w-3.5", currentMode.color)} />
                    </div>
                    <span className="text-xs font-medium">{currentMode.label}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl">
                <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Study Mode
                </div>
                {MODES.map((mode) => {
                    const ModeIcon = mode.icon;
                    const isActive = studyMode === mode.id;

                    return (
                        <DropdownMenuItem
                            key={mode.id}
                            onClick={() => setStudyMode(mode.id)}
                            className={cn(
                                "flex items-start gap-3 p-2 rounded-xl cursor-pointer transition-colors focus:bg-muted",
                                isActive && "bg-muted/50"
                            )}
                        >
                            <div className={cn("p-2 rounded-lg mt-0.5", mode.bgColor)}>
                                <ModeIcon className={cn("h-4 w-4", mode.color)} />
                            </div>
                            <div className="flex-1 space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{mode.label}</span>
                                    {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-tight">
                                    {mode.description}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
