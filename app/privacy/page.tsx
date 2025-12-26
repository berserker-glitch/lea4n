"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, UserCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const highlights = [
    { icon: Shield, title: "Encrypted Data", description: "All data encrypted in transit and at rest" },
    { icon: Eye, title: "No Selling", description: "We never sell your personal information" },
    { icon: Lock, title: "Secure Storage", description: "Industry-standard security measures" },
    { icon: Trash2, title: "Your Control", description: "Delete your data anytime" },
];

export default function PrivacyPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <StaticPageLayout
            title="Privacy Policy"
            description="Your privacy matters. Learn how we collect, use, and protect your information."
        >
            <div className="space-y-12">
                {/* Highlights */}
                <section className="not-prose">
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                        {highlights.map((item, index) => (
                            <Card
                                key={item.title}
                                className={`bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <CardContent className="p-4 text-center">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Content */}
                <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
                    <p className="text-muted-foreground text-sm">
                        <em>Last updated: December 25, 2024</em>
                    </p>

                    <h2 id="introduction">1. Introduction</h2>
                    <p>
                        At Lea4n ("we," "our," or "us"), we take your privacy seriously. This Privacy
                        Policy explains how we collect, use, disclose, and safeguard your information
                        when you use our website and services.
                    </p>

                    <h2 id="collection">2. Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
                        <li><strong>Study Materials:</strong> Documents, PDFs, and other files you upload</li>
                        <li><strong>Usage Data:</strong> Your interactions with our AI, including questions and conversations</li>
                        <li><strong>Payment Information:</strong> Billing details for premium subscriptions</li>
                    </ul>

                    <h3>Information Collected Automatically</h3>
                    <ul>
                        <li>Device information (browser type, operating system)</li>
                        <li>Log data (IP address, access times, pages viewed)</li>
                        <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h2 id="use">3. How We Use Your Information</h2>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process your study materials and generate AI responses</li>
                        <li>Send you updates, security alerts, and support messages</li>
                        <li>Analyze usage patterns to enhance user experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2 id="security">4. Data Security</h2>
                    <p>We implement industry-standard security measures:</p>
                    <ul>
                        <li>All data encrypted in transit using TLS/SSL</li>
                        <li>Study materials encrypted at rest</li>
                        <li>Regular security audits and penetration testing</li>
                        <li>Access controls and authentication requirements</li>
                    </ul>

                    <h2 id="sharing">5. Data Sharing</h2>
                    <p>We do not sell your personal information. We may share data with:</p>
                    <ul>
                        <li>Service providers who assist in operating our platform</li>
                        <li>AI model providers (in anonymized form) to process queries</li>
                        <li>Legal authorities when required by law</li>
                    </ul>

                    <h2 id="rights">6. Your Rights</h2>
                    <ul>
                        <li>Access and download your personal data</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account and associated data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Request data portability</li>
                    </ul>

                    <h2 id="retention">7. Data Retention</h2>
                    <p>
                        We retain your data for as long as your account is active. When you delete
                        your account, we remove your personal data within 30 days, except where
                        retention is required by law.
                    </p>

                    <h2 id="contact">8. Contact Us</h2>
                    <p>If you have questions about this Privacy Policy, contact us at:</p>
                    <ul>
                        <li>Email: privacy@lea4n.com</li>
                    </ul>
                </div>
            </div>
        </StaticPageLayout>
    );
}
