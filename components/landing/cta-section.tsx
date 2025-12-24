import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CTASectionProps {
    className?: string;
}

export function CTASection({ className }: CTASectionProps) {
    return (
        <section className={cn("py-20 md:py-32", className)}>
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-chart-4 p-8 md:p-16 text-center">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl mb-4">
                            Ready to Transform Your Studies?
                        </h2>
                        <p className="mx-auto max-w-xl text-primary-foreground/80 text-lg mb-8">
                            Join thousands of students who are already learning smarter with
                            Lea4n. Start for free today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/signup">
                                <Button
                                    size="xl"
                                    variant="secondary"
                                    className="gap-2 bg-white text-primary hover:bg-white/90"
                                >
                                    Get Started Free
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button
                                    size="xl"
                                    variant="ghost"
                                    className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                                >
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
