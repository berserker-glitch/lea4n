import { Metadata } from "next";
import { BlogListClient } from "./blog-list-client";
import { getAllPosts, getCategories } from "@/lib/blog";

export const metadata: Metadata = {
    title: "Blog | Lea4n - AI Study Tips & Learning Guides",
    description: "Discover the best AI study techniques, learning strategies, and tips to study smarter with artificial intelligence. Expert guides for students.",
    keywords: [
        "AI study tips",
        "learn with AI",
        "AI tutor",
        "study smarter",
        "AI learning",
        "AI education",
        "study techniques",
        "exam preparation",
        "AI homework help"
    ],
    openGraph: {
        title: "Blog | Lea4n - AI Study Tips & Learning Guides",
        description: "Discover the best AI study techniques, learning strategies, and tips to study smarter with artificial intelligence.",
        type: "website",
        url: "https://lea4n.com/blog",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Lea4n - AI Study Tips & Learning Guides",
        description: "Discover the best AI study techniques, learning strategies, and tips to study smarter with artificial intelligence.",
    },
};

export default function BlogPage() {
    const posts = getAllPosts();
    const categories = getCategories();

    return <BlogListClient posts={posts} categories={categories} />;
}
