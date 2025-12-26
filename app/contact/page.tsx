"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, MessageSquare, MapPin, Clock, Send, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const contactMethods = [
    {
        icon: Mail,
        title: "Email Us",
        description: "Our team is here to help",
        contact: "support@lea4n.com",
        link: "mailto:support@lea4n.com",
        gradient: "from-primary/20 to-primary/5",
        iconColor: "text-primary"
    },
    {
        icon: MessageSquare,
        title: "Live Chat",
        description: "Available 9am-6pm EST",
        contact: "Start a conversation",
        link: "#",
        gradient: "from-chart-1/20 to-chart-1/5",
        iconColor: "text-chart-1"
    },
    {
        icon: MapPin,
        title: "Office",
        description: "Come say hello",
        contact: "San Francisco, CA",
        link: null,
        gradient: "from-chart-4/20 to-chart-4/5",
        iconColor: "text-chart-4"
    },
    {
        icon: Clock,
        title: "Response Time",
        description: "We typically respond within",
        contact: "24 hours",
        link: null,
        gradient: "from-chart-5/20 to-chart-5/5",
        iconColor: "text-chart-5"
    },
];

export default function ContactPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <StaticPageLayout
            title="Contact Us"
            description="We'd love to hear from you. Get in touch with our team for support, partnerships, or just to say hello."
        >
            <div className="space-y-16">
                {/* Contact methods */}
                <section className="not-prose">
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                        {contactMethods.map((method, index) => (
                            <Card
                                key={method.title}
                                className={`group bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-500 hover:shadow-lg hover:border-primary/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <CardContent className="p-5 text-center">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                        <method.icon className={`h-6 w-6 ${method.iconColor}`} />
                                    </div>
                                    <h3 className="font-semibold mb-1">{method.title}</h3>
                                    <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                                    {method.link ? (
                                        <a href={method.link} className="text-sm text-primary hover:underline font-medium">
                                            {method.contact}
                                        </a>
                                    ) : (
                                        <span className="text-sm font-medium">{method.contact}</span>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact form */}
                <section className="not-prose">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardContent className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                                <h2 className="text-2xl font-bold">Send us a message</h2>
                                <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-background/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                    <Input
                                        id="subject"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="bg-background/50"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full px-3 py-3 rounded-lg border border-input bg-background/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" size="lg" className="gap-2 shadow-lg shadow-primary/25">
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>

                {/* FAQ link */}
                <section className="not-prose">
                    <Card className="bg-gradient-to-br from-muted/50 via-muted/30 to-background border-border/50">
                        <CardContent className="p-8 text-center">
                            <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Looking for quick answers?</h3>
                            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                                Check out our frequently asked questions for instant answers to common queries.
                            </p>
                            <Link href="/#faq">
                                <Button variant="outline" className="gap-2">
                                    View FAQ
                                    <span>→</span>
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </StaticPageLayout>
    );
}
