"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Heart, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const values = [
    {
        icon: Target,
        title: "Mission-Driven",
        description: "We're on a mission to make quality education accessible to everyone, everywhere.",
        gradient: "from-chart-1/20 to-chart-1/5",
        iconColor: "text-chart-1"
    },
    {
        icon: Heart,
        title: "Student-First",
        description: "Every feature we build starts with 'How does this help students learn better?'",
        gradient: "from-destructive/20 to-destructive/5",
        iconColor: "text-destructive"
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "We leverage cutting-edge AI to create tools that truly make a difference.",
        gradient: "from-chart-5/20 to-chart-5/5",
        iconColor: "text-chart-5"
    },
    {
        icon: Users,
        title: "Community",
        description: "We believe in the power of community and collaborative learning.",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary"
    },
];

const stats = [
    { value: "10K+", label: "Active Students" },
    { value: "50K+", label: "Documents Processed" },
    { value: "100+", label: "Countries" },
    { value: "4.9", label: "Average Rating" },
];

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <StaticPageLayout
            title="About Lea4n"
            description="Empowering students with AI-powered learning tools to study smarter, not harder."
        >
            <div className="space-y-20">
                {/* Stats */}
                <section className="not-prose">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card
                                key={stat.label}
                                className={`bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Story */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Our Story</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="space-y-6 text-muted-foreground leading-relaxed">
                        <p className="text-lg">
                            Lea4n was born from a simple observation: students spend countless hours
                            re-reading textbooks and notes, often struggling to find the specific
                            information they need. We believed there had to be a better way.
                        </p>
                        <p>
                            In 2024, we set out to build the study companion we wished we had during
                            our own education. By combining advanced AI with intuitive design, we
                            created a platform that understands your study materials and helps you
                            learn more effectively.
                        </p>
                        <p>
                            Today, Lea4n helps thousands of students around the world study smarter,
                            not harder. Whether you're preparing for medical exams, engineering finals,
                            or law school, Lea4n is your personal AI tutor, available 24/7.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="space-y-8 not-prose">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Our Values</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {values.map((value, index) => (
                            <Card
                                key={value.title}
                                className={`group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                            >
                                <CardContent className="p-8 relative">
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-br ${value.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                                    <div className="relative">
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                            <value.icon className={`h-7 w-7 ${value.iconColor}`} />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Our Team</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                            We're a passionate team of educators, engineers, and designers who believe
                            in the transformative power of technology in education. Based across multiple
                            time zones, we work together to build the future of learning.
                        </p>
                        <p>
                            Our diverse backgrounds – from teaching to AI research to product design –
                            help us create tools that are not only powerful but also intuitive and
                            delightful to use.
                        </p>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="not-prose">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-chart-4/10 border-primary/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <CardContent className="p-10 text-center relative">
                            <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Want to learn more?</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                We'd love to hear from you. Reach out to our team and let's start a conversation.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                                    Contact Us
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </StaticPageLayout>
    );
}
