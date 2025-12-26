"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { NavBar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { useEffect, useState, useRef } from "react";

interface StaticPageLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    className?: string;
}

export function StaticPageLayout({
    children,
    title,
    description,
    className
}: StaticPageLayoutProps) {
    const [isVisible, setIsVisible] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <NavBar />
            <main className="flex-1">
                {/* Hero header with gradient background */}
                <section
                    ref={headerRef}
                    className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden"
                >
                    {/* Background decorations */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/30 to-background" />
                        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-chart-4/5 blur-3xl" />
                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
                    </div>

                    <Container>
                        <div
                            className={cn(
                                "max-w-4xl transition-all duration-700",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
                                {title}
                            </h1>
                            {description && (
                                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                    </Container>

                    {/* Bottom border */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </section>

                {/* Content */}
                <section className={cn("py-12 md:py-20", className)}>
                    <Container>
                        <div
                            className={cn(
                                "max-w-4xl transition-all duration-700 delay-200",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                        >
                            {children}
                        </div>
                    </Container>
                </section>
            </main>
            <Footer />
        </div>
    );
}
