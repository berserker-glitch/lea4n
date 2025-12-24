"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

// Components
import { ViewToggle } from "@/components/features/view-toggle";
import { ChatInput } from "@/components/features/chat-input";
import { ChatMessage } from "@/components/features/chat-message";
import { ChatWelcome } from "@/components/features/chat-welcome";
import { FileGrid } from "@/components/features/file-grid";
import { FileUploadZone } from "@/components/features/file-upload-zone";
import { EmptyState } from "@/components/features/empty-state";
import { SearchInput } from "@/components/features/search-input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText } from "lucide-react";

export default function SubjectPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        user,
        subjects,
        setCurrentSubjectId,
        currentSubjectId,
        getSubjectFiles,
        addMessage,
        currentConversationId,
        setFileTag,
        // We'll need to fetch messages for conversation if we implement persistence fully
    } = useApp();

    const subjectId = params.subjectId as string;
    const currentView = (searchParams.get("view") as "chat" | "files") || "chat";

    // Local state for chat (since store mock is global but simple)
    const [localMessages, setLocalMessages] = useState<{ role: "user" | "assistant"; content: string; timestamp: Date }[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Sync subject ID
    useEffect(() => {
        if (subjectId && currentSubjectId !== subjectId) {
            setCurrentSubjectId(subjectId);
        }
    }, [subjectId, currentSubjectId, setCurrentSubjectId]);

    const currentSubject = subjects.find(s => s.id === subjectId);
    const currentSubjectFiles = getSubjectFiles(subjectId);

    // Initial greeting if no messages
    // In real app, load messages from DB

    const handleSendMessage = (content: string) => {
        const userMsg = { role: "user" as const, content, timestamp: new Date() };
        setLocalMessages(prev => [...prev, userMsg]);

        setIsTyping(true);
        setTimeout(() => {
            const aiResponses = [
                "I can help with that! Based on your files...",
                "Here's a summary of the concept based on the lecture notes...",
                "Lets break this down step-by-step.",
            ];
            const aiMsg = {
                role: "assistant" as const,
                content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
                timestamp: new Date()
            };
            setLocalMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const filteredFiles = currentSubjectFiles.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!currentSubject) {
        return <div className="p-8">Subject not found</div>;
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Top Bar / Header */}
            <header className="relative flex items-center justify-between px-6 h-16 bg-background shrink-0 z-10 w-full">
                {/* Left: Spacer (Sidebar trigger handled in layout) or Breadcrumbs */}
                <div className="flex items-center gap-3">
                    <div className="w-8" /> {/* Offset for sidebar trigger */}
                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                        <div className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-background", currentSubject.color)} />
                        <span className="font-semibold text-lg text-foreground">{currentSubject.name}</span>
                    </div>
                </div>

                {/* Center: View Toggle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ViewToggle
                        value={currentView}
                        onChange={(view) => router.push(`?view=${view}`)}
                    />
                </div>

                {/* Right: Actions (Pin, etc) */}
                <div className="w-[100px] flex justify-end">
                    {/* Add Pin button later */}
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {currentView === "chat" ? (
                    /* CHAT VIEW */
                    <div className="flex-1 overflow-hidden relative flex flex-col">
                        {localMessages.length === 0 ? (
                            /* Empty State Chat */
                            <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
                                <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h1 className="text-4xl font-semibold text-center text-foreground/80 tracking-tight">
                                        What can I help with?
                                    </h1>
                                    <div className="w-full">
                                        <ChatInput
                                            onSend={handleSendMessage}
                                            placeholder={`Ask about ${currentSubject.name}...`}
                                            className="shadow-lg border-muted-foreground/20"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full pt-4">
                                        {["Explain a concept", "Summarize notes", "Quiz me", "Study tips"].map((action) => (
                                            <Button
                                                key={action}
                                                variant="ghost"
                                                className="h-auto py-3 px-4 justify-start text-sm text-muted-foreground hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-xl"
                                                onClick={() => handleSendMessage(action)}
                                            >
                                                <span className="truncate">{action}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Messages List */
                            <ScrollArea className="flex-1">
                                <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                                    {localMessages.map((msg, i) => (
                                        <ChatMessage
                                            key={i}
                                            role={msg.role}
                                            content={msg.content}
                                            timestamp={msg.timestamp}
                                        />
                                    ))}
                                    {isTyping && <ChatMessage role="assistant" content="" isLoading />}
                                </div>
                            </ScrollArea>
                        )}

                        {/* Bottom Input */}
                        {localMessages.length > 0 && (
                            <div className="p-4 bg-background/80 backdrop-blur-sm shrink-0">
                                <div className="max-w-3xl mx-auto">
                                    <ChatInput
                                        onSend={handleSendMessage}
                                        placeholder={`Message Lea4n...`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* FILES VIEW */
                    <div className="flex-1 overflow-auto p-6">
                        <div className="max-w-6xl mx-auto space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex-1 max-w-md">
                                    <SearchInput
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        placeholder="Search files..."
                                    />
                                </div>
                                <Button className="gap-2">
                                    <Upload className="h-4 w-4" />
                                    Upload Files
                                </Button>
                            </div>

                            {filteredFiles.length > 0 ? (
                                <FileGrid
                                    files={filteredFiles}
                                    onFileTagChange={setFileTag}
                                />
                            ) : searchQuery ? (
                                <EmptyState
                                    icon={FileText}
                                    title="No files found"
                                    description={`No files match "${searchQuery}"`}
                                />
                            ) : (
                                <FileUploadZone
                                    onFilesSelect={(files) => console.log("Files:", files)}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
