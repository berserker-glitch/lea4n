"use client";

import { useEffect, useState } from "react";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Sparkles, TrendingUp, Search } from "lucide-react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface BlogListClientProps {
    posts: BlogPost[];
    categories: { name: string; count: number }[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPost = posts.find(post => post.featured);
    const showFeatured = selectedCategory === "All" && searchQuery === "" && featuredPost;

    return (
        <StaticPageLayout
            title="Blog"
            description="Insights, tips, and updates from the Lea4n team to help you study smarter with AI."
        >
            <div className="space-y-16">
                {/* Search Bar */}
                <section className="not-prose">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/30"
                        />
                    </div>
                </section>

                {/* Featured post */}
                {showFeatured && (
                    <section className="not-prose">
                        <Card
                            className={`overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-chart-4/10 border-primary/20 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        >
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-5 gap-0">
                                    {/* Image side */}
                                    <div className="md:col-span-2 bg-gradient-to-br from-primary/20 to-chart-4/20 flex items-center justify-center p-12 md:p-16">
                                        <div className="text-8xl md:text-9xl">{featuredPost.image}</div>
                                    </div>
                                    {/* Content side */}
                                    <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                                <TrendingUp className="h-3 w-3" />
                                                Featured
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                                                {featuredPost.category}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors">
                                            <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                                        </h2>
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(featuredPost.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            <Button className="gap-2 w-fit">
                                                Read Article
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Categories */}
                <section className="not-prose">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.name
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-1.5 text-xs opacity-70">({category.count})</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* All posts */}
                <section className="not-prose">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-lg">No articles found matching your criteria.</p>
                            <p className="text-sm mt-2">Try adjusting your search or category filter.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {filteredPosts.filter(p => !p.featured || !showFeatured).map((post, index) => (
                                <Card
                                    key={post.slug}
                                    className={`group bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <CardContent className="p-0">
                                            <div className="flex">
                                                {/* Emoji icon */}
                                                <div className="w-24 md:w-32 bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center shrink-0">
                                                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">{post.image}</span>
                                                </div>
                                                {/* Content */}
                                                <div className="p-5 flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Newsletter CTA */}
                <section className="not-prose">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-muted/50 via-muted/30 to-background border-border/50">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        <CardContent className="p-10 text-center relative">
                            <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Subscribe to our newsletter for the latest study tips, product updates, and learning insights.
                            </p>
                            <form
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setEmail("");
                                }}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-background/50"
                                />
                                <Button type="submit" className="gap-2 shadow-lg shadow-primary/25">
                                    Subscribe
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </StaticPageLayout>
    );
}
