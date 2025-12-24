"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateSubjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateSubjectDialog({
    open,
    onOpenChange,
}: CreateSubjectDialogProps) {
    const router = useRouter();
    const { addSubject } = useApp();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Random color generator
    const getRandomColor = () => {
        const colors = [
            "bg-chart-1",
            "bg-chart-2",
            "bg-chart-3",
            "bg-chart-4",
            "bg-chart-5",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsLoading(true);
        try {
            const subject = addSubject(name, getRandomColor());
            onOpenChange(false);
            setName("");
            router.push(`/dashboard/${subject.id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Subject</DialogTitle>
                        <DialogDescription>
                            Organize your learning by creating a new subject folder.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Biology 101"
                                className="col-span-3"
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!name.trim() || isLoading}>
                            {isLoading ? "Creating..." : "Create Subject"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
