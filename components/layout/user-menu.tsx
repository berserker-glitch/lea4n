"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Pencil, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { authApi } from "@/lib/api";

interface UserMenuProps {
    user: {
        name: string | null;
        email: string;
        avatar?: string;
    };
}

export function UserMenu({ user }: UserMenuProps) {
    const router = useRouter();
    const { logout, setUser, user: currentUser } = useApp();
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [newName, setNewName] = useState(user.name || "");
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const handleUpdateName = async () => {
        if (!newName.trim()) return;

        setIsUpdating(true);
        setError(null);

        try {
            const response = await authApi.updateProfile({ name: newName.trim() });
            if (response.data && currentUser) {
                setUser({
                    ...currentUser,
                    name: response.data.name,
                });
                setProfileDialogOpen(false);
            }
        } catch (err) {
            setError("Failed to update name. Please try again.");
            console.error(err);
        } finally {
            setIsUpdating(false);
        }
    };

    const displayName = user.name || user.email.split("@")[0];
    const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-12 w-full justify-start gap-3 px-2 hover:bg-muted/50"
                    >
                        <Avatar className="h-9 w-9 shrink-0">
                            <AvatarImage src={user.avatar} alt={displayName} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start text-left overflow-hidden">
                            <span className="text-sm font-medium truncate w-full">
                                {displayName}
                            </span>
                            <span className="text-xs text-muted-foreground truncate w-full">
                                {user.email}
                            </span>
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="start" side="top" sideOffset={8}>
                    <DropdownMenuLabel className="font-normal pb-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.avatar} alt={displayName} />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-0.5 overflow-hidden">
                                <p className="text-sm font-semibold leading-none truncate">
                                    {displayName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            setNewName(user.name || "");
                            setError(null);
                            setProfileDialogOpen(true);
                        }}
                        className="cursor-pointer"
                    >
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Edit Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Edit Dialog */}
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Pencil className="h-5 w-5" />
                            Edit Profile
                        </DialogTitle>
                        <DialogDescription>
                            Update your display name. This will be visible across the app.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        {/* Avatar Preview */}
                        <div className="flex justify-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.avatar} alt={displayName} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                    {(newName || displayName)
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                        .slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="name">Display Name</Label>
                            <Input
                                id="name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter your name"
                                autoFocus
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Email</Label>
                            <Input value={user.email} disabled className="bg-muted/30" />
                            <p className="text-xs text-muted-foreground">
                                Email cannot be changed
                            </p>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setProfileDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateName}
                            disabled={!newName.trim() || isUpdating}
                        >
                            {isUpdating ? "Saving..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
