"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, ArrowRight, Rocket, Heart, GraduationCap, Coffee, Globe, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const benefits = [
    {
        icon: Rocket,
        title: "Growth",
        description: "Continuous learning programs",
        gradient: "from-chart-4/20 to-chart-4/5",
        iconColor: "text-chart-4"
    },
    {
        icon: Heart,
        title: "Health",
        description: "Full medical, dental & vision",
        gradient: "from-destructive/20 to-destructive/5",
        iconColor: "text-destructive"
    },
    {
        icon: Coffee,
        title: "Flexibility",
        description: "Remote-first, flexible hours",
        gradient: "from-chart-5/20 to-chart-5/5",
        iconColor: "text-chart-5"
    },
    {
        icon: GraduationCap,
        title: "Learning",
        description: "$2K annual learning budget",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary"
    },
    {
        icon: Globe,
        title: "Remote",
        description: "Work from anywhere",
        gradient: "from-chart-1/20 to-chart-1/5",
        iconColor: "text-chart-1"
    },
    {
        icon: Zap,
        title: "Equity",
        description: "Stock options for all",
        gradient: "from-chart-3/20 to-chart-3/5",
        iconColor: "text-chart-3"
    },
];

const openings = [
    {
        title: "Senior Full-Stack Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        slug: "senior-fullstack-engineer"
    },
    {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        slug: "product-designer"
    },
    {
        title: "AI/ML Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        slug: "ai-ml-engineer"
    },
    {
        title: "Content Marketing Manager",
        department: "Marketing",
        location: "Remote",
        type: "Full-time",
        slug: "content-marketing-manager"
    },
];

export default function CareersPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <StaticPageLayout
            title="Careers"
            description="Join us in building the future of education. We're looking for passionate people who want to make a difference."
        >
            <div className="space-y-20">
                {/* Intro */}
                <section>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        At Lea4n, we're building tools that help millions of students learn more
                        effectively. We're a remote-first team of passionate individuals who believe
                        in the transformative power of technology in education. If you want to make
                        a real impact, we'd love to hear from you.
                    </p>
                </section>

                {/* Benefits */}
                <section className="not-prose space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Why Join Us?</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {benefits.map((benefit, index) => (
                            <Card
                                key={benefit.title}
                                className={`group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <CardContent className="p-5">
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                        <benefit.icon className={`h-5 w-5 ${benefit.iconColor}`} />
                                    </div>
                                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Open positions */}
                <section className="not-prose space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        <h2 className="text-2xl font-bold">Open Positions</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, index) => (
                            <Card
                                key={job.slug}
                                className={`group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${(index + 6) * 50}ms` }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                                    {job.department}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="h-4 w-4" />
                                                    {job.location}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" />
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>
                                        <Link href={`/careers/${job.slug}`}>
                                            <Button variant="outline" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="not-prose">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-chart-4/10 border-primary/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <CardContent className="p-10 text-center relative">
                            <Briefcase className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Don't see the right role?</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                We're always looking for talented people. Send us your resume and we'll
                                reach out when a fitting opportunity arises.
                            </p>
                            <a href="mailto:careers@lea4n.com">
                                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                                    Send Your Resume
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </StaticPageLayout>
    );
}
