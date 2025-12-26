"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AdminUser, AdminStats } from "@/lib/api";
import { useApp } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/features/search-input";
import {
    Users,
    MessageSquare,
    FolderOpen,
    FileText,
    BookOpen,
    ArrowLeft,
    Crown,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
    const router = useRouter();
    const { user } = useApp();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect non-superadmin users
    useEffect(() => {
        if (user && user.role !== "SUPERADMIN") {
            router.push("/dashboard");
        }
    }, [user, router]);

    // Load data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [statsRes, usersRes] = await Promise.all([
                    adminApi.getStats(),
                    adminApi.listUsers({ search: searchQuery || undefined }),
                ]);
                if (statsRes.data) setStats(statsRes.data);
                if (usersRes.data) setUsers(usersRes.data);
            } catch (err) {
                console.error("Failed to load admin data:", err);
                setError("Failed to load admin data");
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, [searchQuery]);

    if (user?.role !== "SUPERADMIN") {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                    <Crown className="h-16 w-16 mx-auto text-muted-foreground" />
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-muted-foreground">You need SUPERADMIN privileges to access this page.</p>
                    <Button onClick={() => router.push("/dashboard")}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
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
                        onClick={() => router.push("/dashboard")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Crown className="h-5 w-5 text-amber-500" />
                        <span className="font-semibold text-lg">Admin Dashboard</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <Card className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">Users</span>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalUsers}</p>
                            </Card>
                            <Card className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="text-sm">Subjects</span>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalSubjects}</p>
                            </Card>
                            <Card className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MessageSquare className="h-4 w-4" />
                                    <span className="text-sm">Conversations</span>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalConversations}</p>
                            </Card>
                            <Card className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <FolderOpen className="h-4 w-4" />
                                    <span className="text-sm">Messages</span>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalMessages}</p>
                            </Card>
                            <Card className="p-4 space-y-2">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm">Files</span>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalFiles}</p>
                            </Card>
                        </div>
                    )}

                    {/* Users Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">All Users</h2>
                            <div className="w-64">
                                <SearchInput
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search users..."
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-8 text-muted-foreground">
                                Loading users...
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-destructive">
                                {error}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {users.map((u) => (
                                    <Card
                                        key={u.id}
                                        className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                                        onClick={() => router.push(`/admin/users/${u.id}`)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-10 w-10 rounded-full flex items-center justify-center text-white font-medium",
                                                    u.role === "SUPERADMIN" ? "bg-amber-500" : "bg-primary"
                                                )}>
                                                    {(u.name || u.email)[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{u.name || "No name"}</span>
                                                        {u.role === "SUPERADMIN" && (
                                                            <Crown className="h-3 w-3 text-amber-500" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-muted-foreground">{u.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                <div className="text-center">
                                                    <p className="font-medium text-foreground">{u._count.subjects}</p>
                                                    <p>Subjects</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-medium text-foreground">{u._count.conversations}</p>
                                                    <p>Chats</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="font-medium text-foreground">{u._count.files}</p>
                                                    <p>Files</p>
                                                </div>
                                                <ChevronRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                                {users.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No users found
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
