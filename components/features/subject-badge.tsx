import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const subjectBadgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            color: {
                blue: "bg-chart-4/10 text-chart-4",
                green: "bg-chart-1/10 text-chart-1",
                orange: "bg-chart-2/10 text-chart-2",
                purple: "bg-chart-3/10 text-chart-3",
                yellow: "bg-chart-5/10 text-chart-5",
                red: "bg-destructive/10 text-destructive",
            },
        },
        defaultVariants: {
            color: "blue",
        },
    }
);

interface SubjectBadgeProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof subjectBadgeVariants> {
    name: string;
}

export function SubjectBadge({
    name,
    color,
    className,
    ...props
}: SubjectBadgeProps) {
    return (
        <span
            className={cn(subjectBadgeVariants({ color }), className)}
            {...props}
        >
            <span
                className={cn("h-1.5 w-1.5 rounded-full", {
                    "bg-chart-4": color === "blue",
                    "bg-chart-1": color === "green",
                    "bg-chart-2": color === "orange",
                    "bg-chart-3": color === "purple",
                    "bg-chart-5": color === "yellow",
                    "bg-destructive": color === "red",
                })}
            />
            {name}
        </span>
    );
}
