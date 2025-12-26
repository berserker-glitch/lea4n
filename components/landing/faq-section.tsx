"use client";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface FAQSectionProps {
    className?: string;
}

const faqs = [
    {
        question: "What file formats does Lea4n support?",
        answer: "Lea4n supports a wide range of file formats including PDF, Word documents (DOC, DOCX), PowerPoint presentations (PPT, PPTX), images (JPG, PNG), and plain text files. We're constantly adding support for more formats based on user feedback."
    },
    {
        question: "How does the AI understand my study materials?",
        answer: "Our AI uses advanced natural language processing to read and understand your documents. It creates a semantic understanding of the content, allowing it to answer questions, provide explanations, and generate summaries based on the actual context of your materials."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We take data security very seriously. All your files are encrypted both in transit and at rest. We never share your data with third parties, and you can delete your materials at any time. Your study materials remain private and accessible only to you."
    },
    {
        question: "Can I use Lea4n for free?",
        answer: "Yes! Lea4n offers a generous free tier that includes essential features for students. You can upload materials, organize by subject, and have AI-powered conversations. Premium features are available for users who need more storage and advanced capabilities."
    },
    {
        question: "How accurate are the AI responses?",
        answer: "Our AI is trained to provide accurate, context-aware responses based on your uploaded materials. It cites sources from your documents and clearly indicates when information comes from your study materials versus general knowledge. For best results, we recommend uploading comprehensive study materials."
    },
    {
        question: "Can I use Lea4n on mobile devices?",
        answer: "Yes! Lea4n is fully responsive and works great on smartphones and tablets. You can access your study materials and have AI conversations from any device with a web browser. A dedicated mobile app is coming soon."
    },
];

function FAQItem({
    question,
    answer,
    isOpen,
    onToggle,
    index
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div
            className={cn(
                "border border-border/50 rounded-xl overflow-hidden transition-all duration-300",
                isOpen ? "bg-card/80 shadow-lg shadow-primary/5 border-primary/30" : "bg-card/30 hover:bg-card/50"
            )}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 text-left"
            >
                <span className="font-medium text-base pr-4">{question}</span>
                <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground"
                )}>
                    {isOpen ? (
                        <Minus className="h-4 w-4" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                </div>
            </button>
            <div
                className="overflow-hidden transition-all duration-300"
                style={{ height }}
            >
                <div ref={contentRef} className="px-5 pb-5">
                    <p className="text-muted-foreground leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function FAQSection({ className }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="faq"
            ref={sectionRef}
            className={cn("py-24 md:py-32 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden", className)}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <Container>
                {/* Section header */}
                <div
                    className={cn(
                        "text-center mb-16 transition-all duration-700",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                        <HelpCircle className="h-4 w-4" />
                        Common Questions
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-5">
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Everything you need to know about Lea4n. Can't find the answer you're looking for?{" "}
                        <a href="/contact" className="text-primary hover:underline">Contact our support team</a>.
                    </p>
                </div>

                {/* FAQ items */}
                <div
                    className={cn(
                        "max-w-3xl mx-auto space-y-4 transition-all duration-700 delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            index={index}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
