"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useApp, FileTag } from "@/lib/store";
import { conversationsApi, chatApi, MessageResponse } from "@/lib/api";
import { cn } from "@/lib/utils";

// Components
import { ViewToggle } from "@/components/features/view-toggle";
import { ChatInput } from "@/components/features/chat-input";
import { ChatMessage } from "@/components/features/chat-message";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";

export default function NewConversationPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    const {
        subjects,
        setCurrentSubjectId,
        currentSubjectId,
        setCurrentConversationId,
        refreshData,
    } = useApp();

    const subjectId = params.subjectId as string;
    const initialMessage = searchParams.get("message") || "";
    const currentView = (searchParams.get("view") as "chat" | "files") || "chat";

    // Chat state
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [streamingContent, setStreamingContent] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [conversationId, setConversationId] = useState<string | null>(null);

    // Sync subject ID
    useEffect(() => {
        if (subjectId && currentSubjectId !== subjectId) {
            setCurrentSubjectId(subjectId);
        }
        setCurrentConversationId(null);
    }, [subjectId, currentSubjectId, setCurrentSubjectId, setCurrentConversationId]);

    const currentSubject = subjects.find(s => s.id === subjectId);

    // Create conversation and send initial message on mount
    useEffect(() => {
        if (!initialMessage || hasInitialized.current || !currentSubject) return;
        hasInitialized.current = true;

        const createAndSend = async () => {
            try {
                setIsSending(true);
                setError(null);

                // Show optimistic user message immediately
                const tempUserMsg: MessageResponse = {
                    id: `temp-user-${Date.now()}`,
                    content: decodeURIComponent(initialMessage),
                    role: "USER",
                    createdAt: new Date().toISOString(),
                    conversationId: "pending",
                };
                setMessages([tempUserMsg]);

                // Create conversation with initial message
                const response = await conversationsApi.create(subjectId, {
                    initialMessage: decodeURIComponent(initialMessage),
                });

                if (response.data) {
                    const newConversationId = response.data.id;
                    setConversationId(newConversationId);
                    setCurrentConversationId(newConversationId);

                    // Update URL without full page reload
                    window.history.replaceState(
                        null,
                        '',
                        `/dashboard/${subjectId}/${newConversationId}`
                    );

                    // Refresh sidebar
                    refreshData();

                    // Load the messages from the created conversation
                    const messagesResponse = await chatApi.getMessages(newConversationId);
                    if (messagesResponse.data) {
                        setMessages(messagesResponse.data);
                    }
                }
            } catch (err) {
                console.error("Failed to create conversation:", err);
                setError("Failed to start conversation. Please try again.");
            } finally {
                setIsSending(false);
            }
        };

        createAndSend();
    }, [initialMessage, subjectId, currentSubject, refreshData, setCurrentConversationId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, streamingContent]);

    /**
     * Handle sending follow-up messages
     */
    const handleSendMessage = async (content: string) => {
        if (!content.trim() || isSending || !conversationId) return;

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

    const handleBackToSubject = () => {
        router.push(`/dashboard/${subjectId}`);
        setCurrentConversationId(null);
    };

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
                            New Conversation
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

            {/* Chat Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden relative flex flex-col">
                    <ScrollArea className="flex-1" ref={scrollRef}>
                        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                            {messages.map((msg) => (
                                <ChatMessage
                                    key={msg.id}
                                    messageId={msg.id.startsWith("temp-") ? undefined : msg.id}
                                    role={msg.role.toLowerCase() as "user" | "assistant"}
                                    content={msg.content}
                                    timestamp={new Date(msg.createdAt)}
                                    initialFeedback={msg.feedback}
                                />
                            ))}
                            {streamingContent && (
                                <ChatMessage
                                    role="assistant"
                                    content={streamingContent}
                                    isStreaming
                                />
                            )}
                            {isSending && !streamingContent && messages.length > 0 && (
                                <ChatMessage role="assistant" content="" isLoading />
                            )}
                        </div>
                    </ScrollArea>

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
                                disabled={isSending || !conversationId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
