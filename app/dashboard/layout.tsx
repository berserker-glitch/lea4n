"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "@/lib/auth";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

// Layout components
import { Logo } from "@/components/layout/logo";
import { UserMenu } from "@/components/layout/user-menu";
import { SubjectItem } from "@/components/features/subject-item";
import { CreateSubjectDialog } from "@/components/features/create-subject-dialog";

// UI components
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Icons
import {
    PanelLeftClose,
    FolderPlus,
    PanelLeft,
} from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const {
        user,
        subjects,
        currentSubjectId,
        currentConversationId,
        sidebarOpen,
        setUser,
        setSidebarOpen,
        setCurrentSubjectId,
        setCurrentConversationId,
        deleteConversation,
        togglePinSubject,
        togglePinConversation,
    } = useApp();

    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    // Check auth on mount
    useEffect(() => {
        if (!user) {
            const storedUser = getUser();
            if (!storedUser) {
                router.push("/login");
            } else {
                setUser(storedUser);
            }
        }
    }, [router, setUser, user]);

    const handleSubjectSelect = (subjectId: string) => {
        // Navigate to subject page (new conversation interface)
        router.push(`/dashboard/${subjectId}`);
        setCurrentSubjectId(subjectId);
        setCurrentConversationId(null);
    };

    const handleConversationSelect = (subjectId: string, conversationId: string) => {
        // Navigate to conversation page with /subjectId/conversationId URL
        router.push(`/dashboard/${subjectId}/${conversationId}`);
        setCurrentSubjectId(subjectId);
        setCurrentConversationId(conversationId);
    };

    // Sort subjects: Pinned first, then Created Date
    const sortedSubjects = [...subjects].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="animate-pulse text-muted-foreground">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "flex flex-col bg-sidebar transition-all duration-300 ease-in-out shrink-0",
                    sidebarOpen ? "w-[300px]" : "w-0"
                )}
            >
                {sidebarOpen && (
                    <>
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between p-4 h-16 shrink-0">
                            <Logo size="sm" />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <PanelLeftClose className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* New Subject Button */}
                        <div className="p-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 h-10 shadow-sm border-transparent bg-muted/30 hover:bg-muted/50"
                                onClick={() => setCreateDialogOpen(true)}
                            >
                                <FolderPlus className="h-4 w-4" />
                                New Subject
                            </Button>
                        </div>

                        <Separator className="opacity-0" />

                        {/* Subjects List */}
                        <ScrollArea className="flex-1 px-3">
                            <div className="py-3 space-y-1">
                                {sortedSubjects.map((subject) => (
                                    <SubjectItem
                                        key={subject.id}
                                        id={subject.id}
                                        name={subject.name}
                                        color={subject.color}
                                        conversations={subject.conversations}
                                        isActive={currentSubjectId === subject.id}
                                        activeConversationId={currentConversationId || undefined}
                                        isPinned={subject.isPinned}
                                        onSelect={handleSubjectSelect}
                                        onConversationSelect={handleConversationSelect}
                                        onTogglePin={togglePinSubject}
                                        onTogglePinConversation={togglePinConversation}
                                        onDeleteConversation={deleteConversation}
                                    />
                                ))}
                            </div>
                        </ScrollArea>

                        <CreateSubjectDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

                        {/* Sidebar Footer */}
                        <div className="p-4 h-[72px] flex items-center">
                            <UserMenu user={user} />
                        </div>
                    </>
                )}
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Sidebar Trigger (if closed) */}
                {!sidebarOpen && (
                    <div className="absolute top-4 left-4 z-50">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-muted-foreground hover:bg-muted/50"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <PanelLeft className="h-5 w-5" />
                        </Button>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}
