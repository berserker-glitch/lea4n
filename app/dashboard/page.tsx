"use client";

import { useApp } from "@/lib/store";

export default function DashboardPage() {
    const { user } = useApp();

    if (!user) return null;

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-500">
            <div className="max-w-2xl text-center space-y-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">
                        Welcome back, {(user.name || user.email.split("@")[0]).split(" ")[0]}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Select a subject from the sidebar to start learning.
                    </p>
                </div>
            </div>
        </div>
    );
}
