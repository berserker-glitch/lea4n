"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { authApi } from "@/lib/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
    User,
    Settings,
    Palette,
    Shield,
    HelpCircle,
    LogOut,
    Moon,
    Sun,
    Check,
    Loader2,
    ChevronRight,
} from "lucide-react";

interface UserMenuProps {
    user: {
        id: string;
        email: string;
        name: string | null;
    };
}

type SettingsTab = "general" | "personalization" | "security" | "help";

const TABS = [
    { id: "general" as const, label: "General", icon: Settings },
    { id: "personalization" as const, label: "Personalization", icon: Palette },
    { id: "security" as const, label: "Security", icon: Shield },
    { id: "help" as const, label: "Help & Support", icon: HelpCircle },
];

export function UserMenu({ user }: UserMenuProps) {
    const router = useRouter();
    const { logout } = useApp();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");

    // General settings state
    const [name, setName] = useState(user.name || "");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Theme state
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    // Password change state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const getInitials = (name: string | null, email: string) => {
        if (name) {
            return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
        }
        return email[0].toUpperCase();
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            await authApi.updateProfile({ name });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
        } catch (error) {
            console.error("Failed to save profile:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    const handleChangePassword = async () => {
        setPasswordError("");
        setPasswordSuccess(false);

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }

        setIsChangingPassword(true);
        try {
            await authApi.changePassword({
                currentPassword,
                newPassword,
            });
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (error) {
            setPasswordError("Failed to change password. Check your current password.");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Profile</h3>
                            <p className="text-sm text-muted-foreground">
                                Manage your account information
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {getInitials(name, user.email)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{name || "User"}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={user.email}
                                    disabled
                                    className="bg-muted"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Email cannot be changed
                                </p>
                            </div>

                            <Button
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="w-full sm:w-auto"
                            >
                                {isSaving ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : saveSuccess ? (
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                ) : null}
                                {saveSuccess ? "Saved!" : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                );

            case "personalization":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Appearance</h3>
                            <p className="text-sm text-muted-foreground">
                                Customize how the app looks
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    {isDark ? (
                                        <Moon className="h-5 w-5 text-primary" />
                                    ) : (
                                        <Sun className="h-5 w-5 text-primary" />
                                    )}
                                    <div>
                                        <p className="font-medium">Dark Mode</p>
                                        <p className="text-sm text-muted-foreground">
                                            {isDark ? "Currently using dark theme" : "Currently using light theme"}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={isDark}
                                    onCheckedChange={toggleTheme}
                                />
                            </div>
                        </div>

                    </div>
                );

            case "security":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Security</h3>
                            <p className="text-sm text-muted-foreground">
                                Manage your password and security settings
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                    id="new-password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                            </div>

                            {passwordError && (
                                <p className="text-sm text-destructive">{passwordError}</p>
                            )}

                            {passwordSuccess && (
                                <p className="text-sm text-green-500">Password changed successfully!</p>
                            )}

                            <Button
                                onClick={handleChangePassword}
                                disabled={isChangingPassword || !currentPassword || !newPassword}
                                className="w-full sm:w-auto"
                            >
                                {isChangingPassword && (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                )}
                                Change Password
                            </Button>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="text-lg font-semibold mb-1 text-destructive">Danger Zone</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Irreversible actions
                            </p>
                            <Button variant="destructive" disabled>
                                Delete Account
                            </Button>
                            <p className="text-xs text-muted-foreground mt-2">
                                Contact support to delete your account
                            </p>
                        </div>
                    </div>
                );

            case "help":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Help & Support</h3>
                            <p className="text-sm text-muted-foreground">
                                Get help and learn more about Lea4n
                            </p>
                        </div>

                        <div className="space-y-3">
                            {[
                                { title: "Getting Started", desc: "Learn the basics of Lea4n" },
                                { title: "FAQ", desc: "Frequently asked questions" },
                                { title: "Contact Support", desc: "Get help from our team" },
                                { title: "Report a Bug", desc: "Help us improve" },
                            ].map((item) => (
                                <button
                                    key={item.title}
                                    className="w-full flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
                                >
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </button>
                            ))}
                        </div>

                        <Separator />

                        <div className="text-center text-sm text-muted-foreground">
                            <p>Lea4n v1.0.0</p>
                            <p className="mt-1">Made by 1 student for all students 🎓</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            {/* User Avatar Button - Opens Settings Directly */}
            <button
                onClick={() => setDialogOpen(true)}
                className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
                <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(user.name, user.email)}
                    </AvatarFallback>
                </Avatar>
                <div className="text-left">
                    <p className="text-sm font-medium leading-none">
                        {user.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-[120px] truncate">
                        {user.email}
                    </p>
                </div>
            </button>

            {/* Settings Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
                    <div className="flex h-[500px]">
                        {/* Sidebar Navigation */}
                        <div className="w-[200px] bg-muted/30 p-4 flex flex-col">
                            <DialogTitle className="font-semibold text-lg px-2 mb-4">Settings</DialogTitle>

                            <nav className="space-y-1 flex-1">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                            activeTab === tab.id
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Log out
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
