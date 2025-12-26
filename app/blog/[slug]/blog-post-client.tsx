"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Tag,
    Share2,
    ArrowRight,
    BookOpen
} from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogPostClientProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    // Simple markdown-like rendering for content
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.ReactNode[] = [];
        let inList = false;
        let listItems: string[] = [];
        let inTable = false;
        let tableRows: string[][] = [];

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
                        {listItems.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
            inList = false;
        };

        const flushTable = () => {
            if (tableRows.length > 0) {
                const headers = tableRows[0];
                const body = tableRows.slice(2); // Skip header separator
                elements.push(
                    <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    {headers.map((cell, i) => (
                                        <th key={i} className="text-left p-3 font-semibold">{cell.trim()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {body.map((row, i) => (
                                    <tr key={i} className="border-b border-border/50">
                                        {row.map((cell, j) => (
                                            <td key={j} className="p-3 text-muted-foreground">{cell.trim()}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableRows = [];
            }
            inTable = false;
        };

        lines.forEach((line, index) => {
            // Skip the first H1 title (we show it separately)
            if (index === 0 && line.startsWith('# ')) return;

            // Table detection
            if (line.includes('|') && line.trim().startsWith('|')) {
                if (!inTable) {
                    flushList();
                    inTable = true;
                }
                const cells = line.split('|').filter(c => c.trim() !== '');
                if (!cells.every(c => c.trim().match(/^-+$/))) { // Skip separator rows
                    tableRows.push(cells);
                }
                return;
            } else if (inTable) {
                flushTable();
            }

            // Headers
            if (line.startsWith('## ')) {
                flushList();
                elements.push(
                    <h2 key={index} className="text-2xl font-bold mt-10 mb-4 text-foreground">
                        {line.replace('## ', '')}
                    </h2>
                );
            } else if (line.startsWith('### ')) {
                flushList();
                elements.push(
                    <h3 key={index} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                        {line.replace('### ', '')}
                    </h3>
                );
            }
            // Horizontal rule
            else if (line.trim() === '---') {
                flushList();
                elements.push(<hr key={index} className="my-8 border-border" />);
            }
            // Blockquote
            else if (line.startsWith('> ')) {
                flushList();
                elements.push(
                    <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {line.replace('> ', '')}
                    </blockquote>
                );
            }
            // Unordered list
            else if (line.startsWith('- ')) {
                inList = true;
                listItems.push(line.replace('- ', ''));
            }
            // Numbered list
            else if (/^\d+\. /.test(line)) {
                flushList();
                const text = line.replace(/^\d+\. /, '');
                elements.push(
                    <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground" start={1}>
                        <li>{text}</li>
                    </ol>
                );
            }
            // Bold text with **
            else if (line.includes('**')) {
                flushList();
                const parts = line.split(/\*\*(.*?)\*\*/g);
                elements.push(
                    <p key={index} className="text-muted-foreground leading-relaxed my-4">
                        {parts.map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
                        )}
                    </p>
                );
            }
            // Emoji bullet points
            else if (/^[✅❌]/.test(line.trim())) {
                flushList();
                elements.push(
                    <p key={index} className="text-muted-foreground my-2 pl-2">
                        {line}
                    </p>
                );
            }
            // Regular paragraph
            else if (line.trim() !== '') {
                flushList();
                elements.push(
                    <p key={index} className="text-muted-foreground leading-relaxed my-4">
                        {line}
                    </p>
                );
            }
        });

        flushList();
        flushTable();

        return elements;
    };

    return (
        <StaticPageLayout title={post.title} description={post.description}>
            {/* Back button */}
            <div className={`mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button
                    variant="ghost"
                    className="gap-2 -ml-2"
                    onClick={() => router.push('/blog')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Button>
            </div>

            {/* Article header */}
            <header className={`mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    {post.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {post.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
                    <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                    </span>
                    <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 ml-auto"
                        onClick={handleShare}
                    >
                        <Share2 className="h-3 w-3" />
                        Share
                    </Button>
                </div>
            </header>

            {/* Article content */}
            <article className={`prose prose-lg dark:prose-invert max-w-none transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {renderContent(post.content)}
            </article>

            {/* Tags */}
            <section className={`mt-12 pt-8 border-t border-border transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className={`mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
                    <CardContent className="p-8 text-center">
                        <BookOpen className="h-10 w-10 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Ready to Study Smarter?</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Join thousands of students using Lea4n to learn faster and remember more.
                        </p>
                        <Link href="/signup">
                            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                                Get Started Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
                <section className={`mt-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {relatedPosts.map((relatedPost) => (
                            <Card
                                key={relatedPost.slug}
                                className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                            >
                                <Link href={`/blog/${relatedPost.slug}`}>
                                    <CardContent className="p-6">
                                        <span className="text-4xl block mb-4">{relatedPost.image}</span>
                                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {relatedPost.excerpt}
                                        </p>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </StaticPageLayout>
    );
}
