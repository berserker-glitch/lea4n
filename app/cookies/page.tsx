"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, BarChart3, Shield, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";

const cookieTypes = [
    {
        icon: Shield,
        name: "Essential Cookies",
        description: "Required for the website to function properly. Cannot be disabled.",
        examples: ["Session management", "Security tokens", "Basic preferences"],
        required: true,
        enabled: true,
    },
    {
        icon: Settings,
        name: "Functional Cookies",
        description: "Enable enhanced functionality and personalization.",
        examples: ["Theme preference", "Language settings", "Saved preferences"],
        required: false,
        enabled: true,
    },
    {
        icon: BarChart3,
        name: "Analytics Cookies",
        description: "Help us understand how visitors interact with our website.",
        examples: ["Page views", "User journeys", "Performance metrics"],
        required: false,
        enabled: false,
    },
];

export default function CookiesPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState(
        cookieTypes.map(type => ({ name: type.name, enabled: type.enabled }))
    );

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const togglePreference = (index: number) => {
        if (cookieTypes[index].required) return;
        setPreferences(prev =>
            prev.map((pref, i) => i === index ? { ...pref, enabled: !pref.enabled } : pref)
        );
    };

    return (
        <StaticPageLayout
            title="Cookie Policy"
            description="Learn how we use cookies and similar technologies to improve your experience."
        >
            <div className="space-y-12">
                {/* Intro */}
                <section className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                        <em>Last updated: December 25, 2024</em>
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Cookies are small text files stored on your device when you visit a website.
                        They help us remember your preferences and improve your browsing experience.
                    </p>
                </section>

                {/* Cookie preferences */}
                <section className="not-prose space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Cookie Preferences</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="space-y-4">
                        {cookieTypes.map((type, index) => (
                            <Card
                                key={type.name}
                                className={`bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <type.icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold">{type.name}</h3>
                                                    {type.required && (
                                                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                                                            Required
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-3">
                                                    {type.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {type.examples.map((example) => (
                                                        <span key={example} className="px-2 py-1 rounded bg-muted/50 text-xs text-muted-foreground">
                                                            {example}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => togglePreference(index)}
                                            disabled={type.required}
                                            className={`shrink-0 transition-opacity ${type.required ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                                        >
                                            {preferences[index].enabled ? (
                                                <ToggleRight className="h-8 w-8 text-primary" />
                                            ) : (
                                                <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                                            )}
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button className="gap-2">
                            <Cookie className="h-4 w-4" />
                            Save Preferences
                        </Button>
                    </div>
                </section>

                {/* Additional info */}
                <section className="prose dark:prose-invert max-w-none">
                    <h2>Managing Cookies</h2>
                    <p>You can control cookies in several ways:</p>
                    <ul>
                        <li><strong>Browser settings:</strong> Most browsers allow you to refuse or delete cookies</li>
                        <li><strong>Our preferences:</strong> Use the toggles above to manage optional cookies</li>
                        <li><strong>Third-party opt-out:</strong> Many analytics providers offer opt-out mechanisms</li>
                    </ul>
                    <p>
                        Note: Disabling essential cookies may affect the functionality of our Service.
                    </p>

                    <h2>Contact Us</h2>
                    <p>If you have questions about our use of cookies, contact us at:</p>
                    <ul>
                        <li>Email: privacy@lea4n.com</li>
                    </ul>
                </section>
            </div>
        </StaticPageLayout>
    );
}
