"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import {
    GraduationCap,
    Twitter,
    Github,
    Linkedin,
    Heart,
    ArrowUpRight
} from "lucide-react";

const footerLinks = {
    product: [
        { href: "/use-cases", label: "Use Cases" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
    ],
    resources: [
        { href: "/blog", label: "Study Tips" },
        { href: "/contact", label: "Support" },
    ],
    legal: [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/cookies", label: "Cookies" },
    ],
};

const socialLinks = [
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://github.com", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-background to-muted/20">
            {/* Subtle gradient orb */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-primary/5 to-transparent blur-3xl pointer-events-none" />

            <Container>
                {/* Main Footer Content */}
                <div className="relative pt-16 pb-12">
                    <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="col-span-2 md:col-span-4 lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                    <GraduationCap className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                                    Lea4n
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
                                Your AI-powered study companion. Learn smarter, not harder.
                                Upload your materials and let AI help you understand everything.
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2.5 rounded-xl bg-muted/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links Columns */}
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
                            <ul className="space-y-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-sm font-semibold text-foreground mb-4">Resources</h4>
                            <ul className="space-y-3">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.href + link.label}>
                                        <Link
                                            href={link.href}
                                            className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-2 lg:col-span-3">
                            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
                            <ul className="space-y-3">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative border-t border-border/50 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Lea4n. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by students, for students
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
