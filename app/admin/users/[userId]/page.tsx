"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminApi, AdminUserDetail, AdminConversation } from "@/lib/api";
import { useApp } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Crown,
    MessageSquare,
    FolderOpen,
    FileText,
    BookOpen,
    ChevronRight,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminUserDetailPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.userId as string;
    const { user: currentUser } = useApp();

    const [user, setUser] = useState<AdminUserDetail | null>(null);
    const [conversations, setConversations] = useState<AdminConversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect non-superadmin users
    useEffect(() => {
        if (currentUser && currentUser.role !== "SUPERADMIN") {
            router.push("/dashboard");
        }
    }, [currentUser, router]);

    // Load user data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [userRes, conversationsRes] = await Promise.all([
                    adminApi.getUser(userId),
                    adminApi.getUserConversations(userId),
                ]);
                if (userRes.data) setUser(userRes.data);
                if (conversationsRes.data) setConversations(conversationsRes.data);
            } catch (err) {
                console.error("Failed to load user data:", err);
                setError("Failed to load user data");
            } finally {
                setIsLoading(false);
            }
        };
        if (userId) loadData();
    }, [userId]);

    if (currentUser?.role !== "SUPERADMIN") {
        return null;
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Loading user data...</p>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                    <p className="text-destructive">{error || "User not found"}</p>
                    <Button onClick={() => router.push("/admin")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Admin
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
                        onClick={() => router.push("/admin")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center text-white font-medium",
                            user.role === "SUPERADMIN" ? "bg-amber-500" : "bg-primary"
                        )}>
                            {(user.name || user.email)[0].toUpperCase()}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-lg">{user.name || "No name"}</span>
                                {user.role === "SUPERADMIN" && (
                                    <Crown className="h-4 w-4 text-amber-500" />
                                )}
                            </div>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4 space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <BookOpen className="h-4 w-4" />
                                <span className="text-sm">Subjects</span>
                            </div>
                            <p className="text-2xl font-bold">{user._count.subjects}</p>
                        </Card>
                        <Card className="p-4 space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-sm">Conversations</span>
                            </div>
                            <p className="text-2xl font-bold">{user._count.conversations}</p>
                        </Card>
                        <Card className="p-4 space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                <span className="text-sm">Files</span>
                            </div>
                            <p className="text-2xl font-bold">{user._count.files}</p>
                        </Card>
                    </div>

                    {/* Subjects */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Subjects</h2>
                        <div className="space-y-2">
                            {user.subjects.map((subject) => (
                                <Card key={subject.id} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{subject.title}</p>
                                            {subject.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {subject.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-3 w-3" />
                                                {subject._count.conversations}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-3 w-3" />
                                                {subject._count.files}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {user.subjects.length === 0 && (
                                <p className="text-center py-4 text-muted-foreground">No subjects</p>
                            )}
                        </div>
                    </div>

                    {/* Conversations */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Conversations</h2>
                        <div className="space-y-2">
                            {conversations.map((conv) => (
                                <Card
                                    key={conv.id}
                                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/admin/conversations/${conv.id}`)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{conv.title}</p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <FolderOpen className="h-3 w-3" />
                                                {conv.subject.title}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <MessageSquare className="h-3 w-3" />
                                                {conv._count.messages} messages
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(conv.updatedAt).toLocaleDateString()}
                                            </div>
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {conversations.length === 0 && (
                                <p className="text-center py-4 text-muted-foreground">No conversations</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
