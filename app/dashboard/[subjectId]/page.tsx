"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useApp, FileTag } from "@/lib/store";
import { filesApi, conversationsApi, FileTag as ApiFileTag } from "@/lib/api";
import { cn } from "@/lib/utils";

// Components
import { ViewToggle } from "@/components/features/view-toggle";
import { ChatInput } from "@/components/features/chat-input";
import { FileGrid } from "@/components/features/file-grid";
import { EmptyState } from "@/components/features/empty-state";
import { SearchInput } from "@/components/features/search-input";
import { UploadFilesDialog } from "@/components/features/upload-files-dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText } from "lucide-react";

export default function SubjectPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        subjects,
        setCurrentSubjectId,
        currentSubjectId,
        setCurrentConversationId,
        getSubjectFiles,
        refreshData,
        deleteFile,
    } = useApp();

    const subjectId = params.subjectId as string;
    const currentView = (searchParams.get("view") as "chat" | "files") || "chat";

    // State
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

    // Tag mapping
    const tagToApi: Record<FileTag, ApiFileTag> = {
        Exam: "EXAM",
        Exercise: "EXERCISE",
        Course: "COURSE",
    };

    // Sync subject ID and clear conversation on mount
    useEffect(() => {
        if (subjectId && currentSubjectId !== subjectId) {
            setCurrentSubjectId(subjectId);
        }
        // Clear conversation ID - this page is for new conversations only
        setCurrentConversationId(null);
    }, [subjectId, currentSubjectId, setCurrentSubjectId, setCurrentConversationId]);

    const currentSubject = subjects.find(s => s.id === subjectId);
    const currentSubjectFiles = getSubjectFiles(subjectId);

    /**
     * Handle sending first message - redirects immediately, conversation created on next page
     */
    const handleSendMessage = (content: string) => {
        if (!content.trim()) return;

        // Redirect immediately with message in URL - conversation will be created on the new page
        const encodedMessage = encodeURIComponent(content);
        router.push(`/dashboard/${subjectId}/new?message=${encodedMessage}`);
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
                    <div className="flex items-center gap-2 animate-in fade-in duration-300">
                        <div className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-background", currentSubject.color)} />
                        <span className="font-semibold text-lg text-foreground">{currentSubject.name}</span>
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
                    /* CHAT VIEW - Welcome Screen */
                    <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
                        <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h1 className="text-4xl font-semibold text-center text-foreground/80 tracking-tight">
                                What can I help with?
                            </h1>

                            {error && (
                                <div className="p-3 bg-destructive/10 text-destructive text-sm text-center rounded-lg">
                                    {error}
                                </div>
                            )}

                            <div className="w-full">
                                <ChatInput
                                    onSend={handleSendMessage}
                                    placeholder={`Ask about ${currentSubject.name}...`}
                                    className="shadow-lg border-muted-foreground/20"
                                    disabled={isSending}
                                />
                            </div>

                            {isSending && (
                                <div className="text-center text-muted-foreground text-sm animate-pulse">
                                    Starting conversation with AI...
                                </div>
                            )}

                            {!isSending && (
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
                            )}
                        </div>
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

            {/* Upload Dialog */}
            <UploadFilesDialog
                open={uploadDialogOpen}
                onOpenChange={setUploadDialogOpen}
                subjectId={subjectId}
                onSuccess={() => refreshData()}
            />
        </div>
    );
}
