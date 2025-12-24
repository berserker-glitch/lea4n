import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { TestimonialCard } from "./testimonial-card";

interface TestimonialSectionProps {
    className?: string;
}

const testimonials = [
    {
        quote:
            "Lea4n completely changed how I study. I can upload all my lecture notes and ask questions anytime. It's like having a tutor available 24/7.",
        author: {
            name: "Sarah Chen",
            role: "Medical Student",
        },
        rating: 5,
    },
    {
        quote:
            "The organization features are incredible. I have all my subjects sorted, and the AI actually understands the context of my materials.",
        author: {
            name: "Marcus Johnson",
            role: "Engineering Student",
        },
        rating: 5,
    },
    {
        quote:
            "I was skeptical at first, but the AI's explanations are surprisingly accurate. It's saved me hours of re-reading dense textbooks.",
        author: {
            name: "Emily Roberts",
            role: "Law Student",
        },
        rating: 5,
    },
];

export function TestimonialSection({ className }: TestimonialSectionProps) {
    return (
        <section id="testimonials" className={cn("py-20 md:py-32", className)}>
            <Container>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                        Loved by <span className="text-primary">Students</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        See what students are saying about their learning experience with
                        Lea4n.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
