"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload, FileUp } from "lucide-react";
import { useRef, useState, DragEvent } from "react";

interface FileUploadZoneProps {
    onFilesSelect?: (files: FileList) => void;
    accept?: string;
    multiple?: boolean;
    className?: string;
}

export function FileUploadZone({
    onFilesSelect,
    accept = "*",
    multiple = true,
    className,
}: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFilesSelect?.(e.dataTransfer.files);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = () => {
        if (inputRef.current?.files && inputRef.current.files.length > 0) {
            onFilesSelect?.(inputRef.current.files);
        }
    };

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 transition-all duration-300 cursor-pointer overflow-hidden group",
                isDragging
                    ? "border-primary bg-primary/5 scale-[1.01] shadow-lg"
                    : "border-border/60 hover:border-primary/50 hover:bg-muted/30 bg-card/30 backdrop-blur-sm",
                className
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={handleChange}
            />

            <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500",
                isDragging ? "opacity-100" : "group-hover:opacity-50"
            )} />

            <div
                className={cn(
                    "relative flex items-center justify-center w-16 h-16 rounded-2xl mb-5 transition-all duration-300 shadow-sm",
                    isDragging ? "bg-primary text-primary-foreground scale-110 shadow-lg rotate-3" : "bg-muted group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary"
                )}
            >
                {isDragging ? (
                    <FileUp className="w-8 h-8 animate-bounce" />
                ) : (
                    <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
            </div>

            <div className="relative space-y-1 text-center">
                <p className="text-base font-semibold group-hover:text-primary transition-colors">
                    {isDragging ? "Drop files now" : "Click to upload files"}
                </p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    {isDragging ? "Release to add to your subject" : "Drag & drop files here, or click to browse"}
                </p>
            </div>

            <Button
                variant="outline"
                size="sm"
                className={cn(
                    "relative mt-6 pointer-events-none transition-all duration-300",
                    isDragging ? "opacity-0 translate-y-2" : "opacity-100 group-hover:border-primary/50 group-hover:text-primary"
                )}
            >
                Browse Files
            </Button>
        </div>
    );
}
