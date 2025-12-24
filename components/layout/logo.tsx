import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
    const sizeClasses = {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
    };

    const textSizeClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
    };

    return (
        <Link
            href="/"
            className={cn(
                "flex items-center gap-2 font-bold text-foreground transition-colors hover:text-primary",
                className
            )}
        >
            <div className="flex items-center justify-center rounded-lg bg-primary p-1.5">
                <GraduationCap className={cn(sizeClasses[size], "text-primary-foreground")} />
            </div>
            {showText && (
                <span className={cn(textSizeClasses[size], "font-bold tracking-tight")}>
                    Lea4n
                </span>
            )}
        </Link>
    );
}
