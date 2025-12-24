"use client";

import { useState, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { filesApi, FileTag } from "@/lib/api";
import { Upload, X, FileText, Image, File, Loader2 } from "lucide-react";

interface UploadFilesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    subjectId: string;
    onSuccess?: () => void;
}

const ACCEPTED_TYPES = {
    "application/pdf": "PDF",
    "text/plain": "Text",
    "image/jpeg": "Image",
    "image/jpg": "Image",
    "image/png": "Image",
    "image/gif": "Image",
    "image/webp": "Image",
    "image/svg+xml": "Image",
};

function getFileIcon(mimeType: string) {
    if (mimeType.startsWith("image/")) {
        return <Image className="h-4 w-4 text-blue-500" />;
    }
    if (mimeType === "application/pdf") {
        return <FileText className="h-4 w-4 text-red-500" />;
    }
    return <File className="h-4 w-4 text-muted-foreground" />;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadFilesDialog({
    open,
    onOpenChange,
    subjectId,
    onSuccess,
}: UploadFilesDialogProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [tag, setTag] = useState<FileTag | undefined>();
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const validFiles = selectedFiles.filter((file) =>
            Object.keys(ACCEPTED_TYPES).includes(file.type)
        );
        setFiles((prev) => [...prev, ...validFiles]);
        if (inputRef.current) inputRef.current.value = "";
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setIsUploading(true);
        setError(null);

        try {
            await filesApi.upload(subjectId, files, tag);
            setFiles([]);
            setTag(undefined);
            onOpenChange(false);
            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        if (!isUploading) {
            setFiles([]);
            setTag(undefined);
            setError(null);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5" />
                        Upload Files
                    </DialogTitle>
                    <DialogDescription>
                        Upload PDF, text, or image files to this subject.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Drop Zone */}
                    <div
                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30"
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            accept={Object.keys(ACCEPTED_TYPES).join(",")}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                            Click to select files or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            PDF, TXT, JPEG, PNG, GIF, WebP (max 50MB each)
                        </p>
                    </div>

                    {/* Selected Files */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            <Label>Selected Files ({files.length})</Label>
                            <div className="max-h-40 overflow-y-auto space-y-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 p-2 bg-muted/30 rounded-md"
                                    >
                                        {getFileIcon(file.type)}
                                        <span className="flex-1 text-sm truncate">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => removeFile(index)}
                                            disabled={isUploading}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tag Selection */}
                    <div className="space-y-2">
                        <Label>Tag (optional)</Label>
                        <Select
                            value={tag}
                            onValueChange={(v: string) => setTag(v as FileTag)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a tag" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="COURSE">Course Material</SelectItem>
                                <SelectItem value="EXERCISE">Exercise</SelectItem>
                                <SelectItem value="EXAM">Exam</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={handleClose} disabled={isUploading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpload}
                        disabled={files.length === 0 || isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
