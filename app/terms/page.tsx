"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";

const highlights = [
    { icon: FileText, title: "Clear Terms", description: "Plain language, no legal jargon" },
    { icon: Scale, title: "Fair Use", description: "Reasonable usage policies" },
    { icon: AlertTriangle, title: "Transparency", description: "Know your rights and limits" },
    { icon: CreditCard, title: "Simple Billing", description: "No hidden fees or charges" },
];

export default function TermsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <StaticPageLayout
            title="Terms of Service"
            description="Please read these terms carefully before using Lea4n. They outline your rights and responsibilities."
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
                                    <div className="w-10 h-10 rounded-xl bg-chart-4/10 flex items-center justify-center mx-auto mb-2">
                                        <item.icon className="h-5 w-5 text-chart-4" />
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

                    <h2 id="acceptance">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using Lea4n ("Service"), you agree to be bound by these Terms
                        of Service. If you disagree with any part, you may not access the Service.
                    </p>

                    <h2 id="description">2. Description of Service</h2>
                    <p>
                        Lea4n is an AI-powered learning platform that allows users to upload study
                        materials, organize them by subject, and interact with an AI assistant to
                        enhance their learning experience.
                    </p>

                    <h2 id="accounts">3. User Accounts</h2>
                    <ul>
                        <li>Provide accurate and complete information when creating an account</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Notify us immediately of any unauthorized access</li>
                        <li>Do not use another person's account without permission</li>
                    </ul>

                    <h2 id="acceptable-use">4. Acceptable Use</h2>
                    <p>You agree not to:</p>
                    <ul>
                        <li>Upload content that infringes on intellectual property rights</li>
                        <li>Use the Service for any illegal purpose</li>
                        <li>Attempt to gain unauthorized access to our systems</li>
                        <li>Share your account credentials with others</li>
                        <li>Use the Service to harass, abuse, or harm others</li>
                        <li>Upload malicious content or viruses</li>
                    </ul>

                    <h2 id="content">5. Content Ownership</h2>
                    <h3>Your Content</h3>
                    <p>
                        You retain all rights to the content you upload. By uploading, you grant us
                        a license to process, store, and display your content solely for providing the Service.
                    </p>
                    <h3>Our Content</h3>
                    <p>
                        The Service and its original content are the exclusive property of Lea4n,
                        protected by copyright, trademark, and other laws.
                    </p>

                    <h2 id="ai">6. AI-Generated Content</h2>
                    <p>
                        AI responses are for informational and educational purposes only. We do not
                        guarantee accuracy or reliability. Verify important information from authoritative sources.
                    </p>

                    <h2 id="payment">7. Payment Terms</h2>
                    <ul>
                        <li>Premium subscriptions are billed in advance</li>
                        <li>All fees are non-refundable except as required by law</li>
                        <li>We may change prices with 30 days notice</li>
                        <li>You can cancel your subscription at any time</li>
                    </ul>

                    <h2 id="termination">8. Termination</h2>
                    <p>
                        We may terminate or suspend your account immediately for breach of these Terms.
                        Upon termination, your right to use the Service ceases immediately.
                    </p>

                    <h2 id="liability">9. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by law, Lea4n shall not be liable for any
                        indirect, incidental, special, consequential, or punitive damages.
                    </p>

                    <h2 id="contact">10. Contact Us</h2>
                    <p>If you have questions about these Terms, contact us at:</p>
                    <ul>
                        <li>Email: legal@lea4n.com</li>
                    </ul>
                </div>
            </div>
        </StaticPageLayout>
    );
}
