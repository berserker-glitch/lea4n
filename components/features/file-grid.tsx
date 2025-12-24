"use client";

import { cn } from "@/lib/utils";
import { FileItem, FileTag } from "@/lib/store";
import { FileCard } from "./file-card";

interface FileGridProps {
    files: FileItem[];
    onFileClick?: (fileId: string) => void;
    onFileDelete?: (fileId: string) => void;
    onFileDownload?: (fileId: string) => void;
    onFileTagChange?: (fileId: string, tag: FileTag) => void;
    className?: string;
}

export function FileGrid({
    files,
    onFileClick,
    onFileDelete,
    onFileDownload,
    onFileTagChange,
    className,
}: FileGridProps) {
    if (files.length === 0) {
        return null;
    }

    return (
        <div
            className={cn(
                "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4",
                className
            )}
        >
            {files.map((file) => (
                <FileCard
                    key={file.id}
                    {...file}
                    onClick={() => onFileClick?.(file.id)}
                    onDelete={() => onFileDelete?.(file.id)}
                    onDownload={() => onFileDownload?.(file.id)}
                    onTagChange={(tag) => onFileTagChange?.(file.id, tag)}
                />
            ))}
        </div>
    );
}
