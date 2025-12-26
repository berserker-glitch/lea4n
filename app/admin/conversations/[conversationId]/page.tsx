"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi, AdminMessage } from "@/lib/api";
import { useApp } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, User, Bot, Calendar, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationInfo {
    id: string;
    title: string;
    createdAt: string;
    user: { id: string; email: string; name: string | null };
    subject: { id: string; title: string };
}

export default function AdminConversationViewerPage() {
    const router = useRouter();
    const params = useParams();
    const conversationId = params.conversationId as string;
    const { user: currentUser } = useApp();

    const [conversation, setConversation] = useState<ConversationInfo | null>(null);
    const [messages, setMessages] = useState<AdminMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect non-superadmin users
    useEffect(() => {
        if (currentUser && currentUser.role !== "SUPERADMIN") {
            router.push("/dashboard");
        }
    }, [currentUser, router]);

    // Load conversation data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await adminApi.getConversationMessages(conversationId);
                if (res.data) {
                    setConversation(res.data.conversation);
                    setMessages(res.data.messages);
                }
            } catch (err) {
                console.error("Failed to load conversation:", err);
                setError("Failed to load conversation");
            } finally {
                setIsLoading(false);
            }
        };
        if (conversationId) loadData();
    }, [conversationId]);

    if (currentUser?.role !== "SUPERADMIN") {
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Loading conversation...</p>
            </div>
        );
    }

    if (error || !conversation) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                    <p className="text-destructive">{error || "Conversation not found"}</p>
                    <Button onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-6 h-16 bg-background border-b shrink-0">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => router.push(`/admin/users/${conversation.user.id}`)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <p className="font-semibold">{conversation.title}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {conversation.user.name || conversation.user.email}
                            </span>
                            <span className="flex items-center gap-1">
                                <FolderOpen className="h-3 w-3" />
                                {conversation.subject.title}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(conversation.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground">
                    {messages.length} messages
                </div>
            </header>

            {/* Messages */}
            <ScrollArea className="flex-1">
                <div className="max-w-3xl mx-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex gap-3",
                                msg.role === "USER" ? "flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                                msg.role === "USER"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}>
                                {msg.role === "USER" ? (
                                    <User className="h-4 w-4" />
                                ) : (
                                    <Bot className="h-4 w-4" />
                                )}
                            </div>
                            <Card className={cn(
                                "p-4 max-w-[80%]",
                                msg.role === "USER" ? "bg-primary/10" : ""
                            )}>
                                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {new Date(msg.createdAt).toLocaleString()}
                                </p>
                            </Card>
                        </div>
                    ))}
                    {messages.length === 0 && (
                        <p className="text-center py-8 text-muted-foreground">
                            No messages in this conversation
                        </p>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
