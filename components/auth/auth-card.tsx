import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/layout/logo";
import Link from "next/link";

interface AuthCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

export function AuthCard({
    title,
    description,
    children,
    footer,
    className,
}: AuthCardProps) {
    return (
        <div className={cn("flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12", className)}>
            <div className="mb-8">
                <Logo size="lg" />
            </div>
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {children}
                </CardContent>
            </Card>
            {footer && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    {footer}
                </div>
            )}
        </div>
    );
}
