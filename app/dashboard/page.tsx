"use client";

import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";

export default function DashboardPage() {
    const { user, subjects } = useApp();

    if (!user) return null;

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="max-w-2xl text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                        Welcome back, {user.name.split(" ")[0]}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Select a subject from the sidebar to start learning.
                    </p>
                </div>

                {subjects.length === 0 && (
                    <div className="p-8 border border-dashed rounded-2xl bg-muted/20">
                        <p className="text-muted-foreground mb-4">
                            You don&apos;t have any subjects yet. Create one to get started!
                        </p>
                        <Button
                            className="gap-2"
                            onClick={() => {
                                // Trigger dialog (handled globally or via ref refactor)
                                // For now we can't trigger the sidebar button from here easily without context/event
                                console.log("Create subject trigger");
                            }}
                        >
                            <FolderPlus className="h-4 w-4" />
                            Create First Subject
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
