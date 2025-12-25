"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useApp, FileTag } from "@/lib/store";
import { filesApi, chatApi, FileTag as ApiFileTag, MessageResponse } from "@/lib/api";
import { cn } from "@/lib/utils";

// Components
import { ViewToggle } from "@/components/features/view-toggle";
import { ChatInput } from "@/components/features/chat-input";
import { ChatMessage } from "@/components/features/chat-message";
import { FileGrid } from "@/components/features/file-grid";
import { EmptyState } from "@/components/features/empty-state";
import { SearchInput } from "@/components/features/search-input";
import { UploadFilesDialog } from "@/components/features/upload-files-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, ArrowLeft } from "lucide-react";

export default function ConversationPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const {
        subjects,
        setCurrentSubjectId,
        currentSubjectId,
        currentConversationId,
        setCurrentConversationId,
        getSubjectFiles,
        refreshData,
        deleteFile,
    } = useApp();

    const subjectId = params.subjectId as string;
    const conversationId = params.conversationId as string;
    const currentView = (searchParams.get("view") as "chat" | "files") || "chat";

    // Chat state
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [streamingContent, setStreamingContent] = useState<string>("");
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Files state
    const [searchQuery, setSearchQuery] = useState("");
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    // Tag mapping from local to API format
    const tagToApi: Record<FileTag, ApiFileTag> = {
        Exam: "EXAM",
        Exercise: "EXERCISE",
        Course: "COURSE",
    };

    // Sync IDs on mount
    useEffect(() => {
        if (subjectId && currentSubjectId !== subjectId) {
            setCurrentSubjectId(subjectId);
        }
        if (conversationId && currentConversationId !== conversationId) {
            setCurrentConversationId(conversationId);
        }
    }, [subjectId, conversationId, currentSubjectId, currentConversationId, setCurrentSubjectId, setCurrentConversationId]);

    // Load messages when conversation changes
    useEffect(() => {
        const loadMessages = async () => {
            if (!conversationId) return;

            try {
                setIsLoadingMessages(true);
                setError(null);
                const response = await chatApi.getMessages(conversationId);
                if (response.data) {
                    setMessages(response.data);
                }
            } catch (err) {
                console.error("Failed to load messages:", err);
                setError("Failed to load messages");
            } finally {
                setIsLoadingMessages(false);
            }
        };

        loadMessages();
    }, [conversationId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, streamingContent]);

    const currentSubject = subjects.find(s => s.id === subjectId);
    const currentSubjectFiles = getSubjectFiles(subjectId);
    const currentConversation = currentSubject?.conversations.find(c => c.id === conversationId);

    /**
     * Handle sending message with streaming
     */
    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isSending || !conversationId) return;

        // Add optimistic user message
        const tempUserMsg: MessageResponse = {
            id: `temp-${Date.now()}`,
            content,
            role: "USER",
            createdAt: new Date().toISOString(),
            conversationId,
        };

        try {
            setIsSending(true);
            setError(null);
            setMessages(prev => [...prev, tempUserMsg]);
            setStreamingContent("");

            // Stream message and AI response
            await chatApi.sendMessageStream(
                conversationId,
                content,
                (chunk) => {
                    setStreamingContent(prev => prev + chunk);
                },
                (userMessage, assistantMessage) => {
                    setMessages(prev => [
                        ...prev.filter(m => m.id !== tempUserMsg.id),
                        userMessage,
                        assistantMessage,
                    ]);
                    setStreamingContent("");
                    refreshData();
                }
            );
        } catch (err) {
            console.error("Failed to send message:", err);
            setError("Failed to send message. Please try again.");
            setMessages(prev => prev.filter(m => !m.id.startsWith("temp-")));
        } finally {
            setIsSending(false);
        }
    };

    // File handlers
    const handleDeleteFile = async (fileId: string) => {
        try {
            await filesApi.delete(fileId);
            deleteFile(fileId);
        } catch (error) {
            console.error("Failed to delete file:", error);
        }
    };

    const handleTagChange = async (fileId: string, tag: FileTag) => {
        try {
            await filesApi.updateTag(fileId, tagToApi[tag]);
            refreshData();
        } catch (error) {
            console.error("Failed to update tag:", error);
        }
    };

    const getFileUrl = (fileName: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const baseUrl = apiUrl.replace("/api", "");
        return `${baseUrl}/uploads/${fileName}`;
    };

    const handleViewFile = (fileId: string) => {
        const file = filteredFiles.find(f => f.id === fileId);
        if (file) {
            window.open(getFileUrl(file.name), "_blank");
        }
    };

    const handleDownloadFile = (fileId: string) => {
        const file = filteredFiles.find(f => f.id === fileId);
        if (file) {
            const link = document.createElement("a");
            link.href = getFileUrl(file.name);
            link.download = file.originalName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleBackToSubject = () => {
        router.push(`/dashboard/${subjectId}`);
        setCurrentConversationId(null);
    };

    const filteredFiles = currentSubjectFiles.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!currentSubject) {
        return <div className="p-8">Subject not found</div>;
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="relative flex items-center justify-between px-6 h-16 bg-background shrink-0 z-10 w-full">
                <div className="flex items-center gap-3">
                    <div className="w-8" />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={handleBackToSubject}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                        <div className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-background", currentSubject.color)} />
                        <span className="font-semibold text-lg text-foreground">
                            {currentConversation?.title || "Conversation"}
                        </span>
                    </div>
                </div>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ViewToggle
                        value={currentView}
                        onChange={(view) => router.push(`?view=${view}`)}
                    />
                </div>

                <div className="w-[100px] flex justify-end" />
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {currentView === "chat" ? (
                    <div className="flex-1 overflow-hidden relative flex flex-col">
                        {isLoadingMessages ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="animate-pulse text-muted-foreground">Loading messages...</div>
                            </div>
                        ) : (
                            <ScrollArea className="flex-1" ref={scrollRef}>
                                <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                                    {messages.map((msg) => (
                                        <ChatMessage
                                            key={msg.id}
                                            role={msg.role.toLowerCase() as "user" | "assistant"}
                                            content={msg.content}
                                            timestamp={new Date(msg.createdAt)}
                                        />
                                    ))}
                                    {streamingContent && (
                                        <ChatMessage
                                            role="assistant"
                                            content={streamingContent}
                                            isStreaming
                                        />
                                    )}
                                    {isSending && !streamingContent && (
                                        <ChatMessage role="assistant" content="" isLoading />
                                    )}
                                </div>
                            </ScrollArea>
                        )}

                        {error && (
                            <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="p-4 bg-background/80 backdrop-blur-sm shrink-0">
                            <div className="max-w-3xl mx-auto">
                                <ChatInput
                                    onSend={handleSendMessage}
                                    placeholder="Continue the conversation..."
                                    disabled={isSending}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
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
                                <Button
                                    className="gap-2"
                                    onClick={() => setUploadDialogOpen(true)}
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Files
                                </Button>
                            </div>

                            {filteredFiles.length > 0 ? (
                                <FileGrid
                                    files={filteredFiles}
                                    onFileClick={handleViewFile}
                                    onFileDownload={handleDownloadFile}
                                    onFileDelete={handleDeleteFile}
                                    onFileTagChange={handleTagChange}
                                />
                            ) : searchQuery ? (
                                <EmptyState
                                    icon={FileText}
                                    title="No files found"
                                    description={`No files match "${searchQuery}"`}
                                />
                            ) : (
                                <EmptyState
                                    icon={FileText}
                                    title="No files yet"
                                    description="Upload files using the button above"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <UploadFilesDialog
                open={uploadDialogOpen}
                onOpenChange={setUploadDialogOpen}
                subjectId={subjectId}
                onSuccess={() => refreshData()}
            />
        </div>
    );
}
