import posts from '@/content/blog/posts.json';

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    content: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    image: string;
    readTime: string;
    featured: boolean;
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
    return (posts as BlogPost[]).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
    return (posts as BlogPost[]).find(post => post.slug === slug);
}

/**
 * Get all posts in a specific category
 */
export function getPostsByCategory(category: string): BlogPost[] {
    return getAllPosts().filter(post => post.category === category);
}

/**
 * Get featured posts
 */
export function getFeaturedPosts(): BlogPost[] {
    return getAllPosts().filter(post => post.featured);
}

/**
 * Get all unique categories with post counts
 */
export function getCategories(): { name: string; count: number }[] {
    const all = getAllPosts();
    const categoryMap = new Map<string, number>();

    all.forEach(post => {
        categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1);
    });

    return [
        { name: "All", count: all.length },
        ...Array.from(categoryMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
    ];
}

/**
 * Get related posts (same category, excluding current)
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
    const currentPost = getPostBySlug(slug);
    if (!currentPost) return [];

    return getAllPosts()
        .filter(post => post.slug !== slug && post.category === currentPost.category)
        .slice(0, limit);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
    const tags = new Set<string>();
    getAllPosts().forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
}
