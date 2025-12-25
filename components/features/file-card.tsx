import { cn } from "@/lib/utils";
import { FileTag } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
    FileText,
    FileImage,
    FileVideo,
    FileAudio,
    File,
    MoreVertical,
    Download,
    Trash2,
    Eye,
    Tag,
    Loader2,
    AlertCircle,
    CheckCircle2,
    RefreshCw,
} from "lucide-react";

interface FileCardProps {
    id: string;
    name: string;
    originalName: string;
    type: "pdf" | "image" | "video" | "audio" | "document" | "other";
    size: number;
    tag?: FileTag;
    uploadedAt: Date;
    thumbnailUrl?: string;
    onClick?: () => void;
    onDelete?: () => void;
    onDownload?: () => void;
    onTagChange?: (tag: FileTag) => void;
    onRetry?: () => void;
    processStatus?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
    className?: string;
}

const fileIcons = {
    pdf: FileText,
    image: FileImage,
    video: FileVideo,
    audio: FileAudio,
    document: FileText,
    other: File,
};

const fileColors = {
    pdf: "text-destructive bg-destructive/10",
    image: "text-chart-1 bg-chart-1/10",
    video: "text-chart-3 bg-chart-3/10",
    audio: "text-chart-2 bg-chart-2/10",
    document: "text-chart-4 bg-chart-4/10",
    other: "text-muted-foreground bg-muted",
};

const tagColors: Record<FileTag, string> = {
    Exam: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    Exercise: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    Course: "bg-primary/10 text-primary hover:bg-primary/20",
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileCard({
    id,
    name,
    originalName,
    type,
    size,
    tag,
    uploadedAt,
    thumbnailUrl,
    onClick,
    onDelete,
    onDownload,
    onTagChange,
    onRetry,
    processStatus,
    className,
}: FileCardProps) {
    const Icon = fileIcons[type];

    return (
        <Card
            className={cn(
                "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 bg-card/50 backdrop-blur-sm",
                className
            )}
            onClick={onClick}
        >
            {/* Tag Badge */}
            {tag && (
                <div className="absolute top-2 right-2 z-20">
                    <Badge variant="secondary" className={cn("text-[10px] h-5 px-1.5 font-medium border-0", tagColors[tag])}>
                        {tag}
                    </Badge>
                </div>
            )}

            {/* Processing Status */}
            {processStatus && processStatus !== "COMPLETED" && (
                <div className="absolute top-2 left-2 z-20">
                    <Badge
                        variant="secondary"
                        className={cn(
                            "text-[10px] h-5 px-1.5 font-medium border-0 gap-1",
                            processStatus === "PROCESSING" && "bg-blue-500/10 text-blue-500",
                            processStatus === "FAILED" && "bg-red-500/10 text-red-500",
                            processStatus === "PENDING" && "bg-yellow-500/10 text-yellow-500",
                        )}
                    >
                        {processStatus === "PROCESSING" && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
                        {processStatus === "FAILED" && <AlertCircle className="h-2.5 w-2.5" />}
                        {processStatus === "PENDING" && <Loader2 className="h-2.5 w-2.5" />}
                        {processStatus}
                    </Badge>
                </div>
            )}

            {/* Thumbnail or Icon */}
            <div className="relative aspect-[4/3] bg-muted/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div
                        className={cn(
                            "flex items-center justify-center w-16 h-16 rounded-2xl transition-transform duration-300 group-hover:scale-110 shadow-sm",
                            fileColors[type]
                        )}
                    >
                        <Icon className="w-8 h-8" />
                    </div>
                )}

                {/* Hover actions */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 gap-1.5 bg-background/90 hover:bg-background shadow-sm backdrop-blur-md"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        View
                    </Button>
                </div>
            </div>

            {/* File info */}
            <div className="p-3.5 space-y-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-foreground leading-tight" title={originalName}>
                            {originalName}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground">
                            <span className="uppercase font-semibold tracking-wider opacity-70">{type}</span>
                            <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/50" />
                            <span>{formatFileSize(size)}</span>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 -mr-1.5 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownload?.(); }} className="gap-2">
                                <Download className="h-4 w-4" />
                                Download
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="gap-2">
                                    <Tag className="h-4 w-4" />
                                    Set Tag
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    {(["Exam", "Exercise", "Course"] as FileTag[]).map((t) => (
                                        <DropdownMenuItem key={t} onClick={(e) => { e.stopPropagation(); onTagChange?.(t); }}>
                                            {t}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            {processStatus === "FAILED" && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRetry?.(); }} className="gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Retry Processing
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDelete?.(); }} className="text-destructive focus:text-destructive gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}
