"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
    Menu,
    X,
    Sparkles,
    ChevronRight
} from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export function NavBar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <Container>
                    <nav className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Logo size="sm" className="relative z-50" />

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group",
                                        pathname === link.href
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                                    )}
                                    <span className="absolute inset-0 rounded-full bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-sm font-medium">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="gap-2 text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-2 md:hidden">
                            <ThemeToggle />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative z-50"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    </nav>
                </Container>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden transition-all duration-500",
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-2xl font-semibold transition-all duration-500 flex items-center gap-3",
                                isMobileMenuOpen
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4",
                                pathname === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <ChevronRight className="h-5 w-5 text-primary" />
                            )}
                        </Link>
                    ))}

                    <div
                        className={cn(
                            "flex flex-col gap-3 mt-8 w-full max-w-xs transition-all duration-500",
                            isMobileMenuOpen
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        )}
                        style={{ transitionDelay: "400ms" }}
                    >
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full" size="lg">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                            <Button className="w-full gap-2 shadow-lg shadow-primary/25" size="lg">
                                <Sparkles className="h-4 w-4" />
                                Get Started Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
