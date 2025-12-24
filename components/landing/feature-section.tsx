import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { FeatureCard } from "./feature-card";
import {
    Upload,
    FolderOpen,
    MessageSquare,
    Brain,
    FileSearch,
    Zap,
} from "lucide-react";

interface FeatureSectionProps {
    className?: string;
}

const features = [
    {
        icon: Upload,
        title: "Upload Anything",
        description:
            "Upload PDFs, images, documents, and more. We support all common file formats for your study materials.",
    },
    {
        icon: FolderOpen,
        title: "Organize by Subject",
        description:
            "Keep your materials organized with subjects and folders. Find what you need instantly.",
    },
    {
        icon: MessageSquare,
        title: "AI Conversations",
        description:
            "Start conversations about your materials. Ask questions and get instant, accurate answers.",
    },
    {
        icon: Brain,
        title: "Smart Understanding",
        description:
            "Our AI reads and understands your documents, providing context-aware explanations.",
    },
    {
        icon: FileSearch,
        title: "Quick Search",
        description:
            "Search across all your materials instantly. Find that specific concept in seconds.",
    },
    {
        icon: Zap,
        title: "Study Faster",
        description:
            "Get summaries, quizzes, and explanations on demand. Learn more in less time.",
    },
];

export function FeatureSection({ className }: FeatureSectionProps) {
    return (
        <section id="features" className={cn("py-20 md:py-32", className)}>
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Everything You Need to{" "}
                        <span className="text-primary">Succeed</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Powerful features designed to make studying easier, faster, and more
                        effective.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
