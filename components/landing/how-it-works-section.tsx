import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

interface HowItWorksSectionProps {
    className?: string;
}

const steps = [
    {
        number: "01",
        title: "Upload Your Materials",
        description:
            "Drop your PDFs, notes, textbooks, and study materials into Lea4n. We handle all common file formats.",
    },
    {
        number: "02",
        title: "Organize by Subject",
        description:
            "Create subjects and organize your materials. Keep everything structured and easy to find.",
    },
    {
        number: "03",
        title: "Start a Conversation",
        description:
            "Ask questions about your materials. Our AI understands context and provides accurate answers.",
    },
    {
        number: "04",
        title: "Learn & Succeed",
        description:
            "Get summaries, explanations, and quizzes. Study smarter and ace your exams.",
    },
];

export function HowItWorksSection({ className }: HowItWorksSectionProps) {
    return (
        <section id="how-it-works" className={cn("py-20 md:py-32 bg-muted/30", className)}>
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        How It <span className="text-primary">Works</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Get started in minutes. No complicated setup required.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={step.number} className="relative">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-1/2 z-0" />
                            )}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4">
                                    {step.number}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
