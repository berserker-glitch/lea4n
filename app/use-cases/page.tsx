import { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    GraduationCap,
    BookOpen,
    FileText,
    Brain,
    Target,
    Clock,
    Upload,
    MessageSquare,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Lightbulb,
    BookMarked,
    PenTool,
    Calculator,
    Microscope,
    Scale,
    Globe,
    Code,
    Stethoscope
} from "lucide-react";

export const metadata: Metadata = {
    title: "Use Cases | Lea4n - AI Study Assistant for Students",
    description: "Discover how Lea4n helps students study smarter. From summarizing textbooks to generating practice quizzes, explore real use cases for AI-powered learning.",
    keywords: [
        "AI study use cases",
        "AI homework help",
        "AI exam preparation",
        "AI note summarizer",
        "AI quiz generator",
        "study assistant"
    ],
};

const mainUseCases = [
    {
        icon: FileText,
        title: "Upload & Understand Any Document",
        description: "Upload PDFs, Word docs, images, or scanned notes. Lea4n extracts the text automatically—even from handwritten notes and scanned textbooks using AI-powered OCR.",
        features: [
            "PDF text extraction with page-by-page analysis",
            "Word document (.docx) support",
            "Image OCR for handwritten notes",
            "Scanned document recognition"
        ],
        color: "from-blue-500/20 to-blue-600/10",
        iconColor: "text-blue-500"
    },
    {
        icon: Brain,
        title: "AI That Remembers You",
        description: "Unlike generic AI tools, Lea4n remembers your learning preferences, progress, and goals across all conversations. The more you use it, the better it understands how to help you.",
        features: [
            "Persistent memory across sessions",
            "Tracks your learning preferences",
            "Remembers your goals & deadlines",
            "Adapts explanations to your level"
        ],
        color: "from-purple-500/20 to-purple-600/10",
        iconColor: "text-purple-500"
    },
    {
        icon: BookOpen,
        title: "Subject-Based Organization",
        description: "Organize your studies by subject. Each subject gets its own AI memory, files, and conversation history—perfect for managing multiple courses.",
        features: [
            "Separate AI context per subject",
            "Upload materials to specific subjects",
            "Color-coded subject organization",
            "Easy switching between topics"
        ],
        color: "from-emerald-500/20 to-emerald-600/10",
        iconColor: "text-emerald-500"
    },
    {
        icon: MessageSquare,
        title: "Real-Time Streaming Responses",
        description: "Get answers instantly with streaming AI responses. Watch as Lea4n thinks and responds in real-time—no waiting for complete answers.",
        features: [
            "Instant token-by-token streaming",
            "Powered by Gemini 2.0 Flash",
            "Natural conversation flow",
            "Context-aware follow-ups"
        ],
        color: "from-amber-500/20 to-amber-600/10",
        iconColor: "text-amber-500"
    },
];

const studentScenarios = [
    {
        icon: BookMarked,
        title: "Exam Preparation",
        scenario: "You have a biology final in 3 days. Upload your lecture notes, textbook chapters, and past exams. Ask Lea4n to create practice questions, explain confusing concepts, and quiz you until you're confident.",
        tags: ["Quizzes", "Explanations", "Review"]
    },
    {
        icon: PenTool,
        title: "Essay Writing Help",
        scenario: "Working on a research paper? Upload your sources and ask Lea4n to help you understand the key arguments, generate thesis ideas, and explain complex academic language.",
        tags: ["Research", "Analysis", "Writing"]
    },
    {
        icon: Lightbulb,
        title: "Concept Clarification",
        scenario: "Struggling to understand a concept from class? Ask Lea4n to explain it in different ways—with analogies, examples, or step-by-step breakdowns until it clicks.",
        tags: ["Understanding", "Examples", "Analogies"]
    },
    {
        icon: Calculator,
        title: "Problem-Solving Guidance",
        scenario: "Stuck on a math problem? Upload a photo of the question and let Lea4n guide you through the solution step-by-step—learning the method, not just the answer.",
        tags: ["Math", "Step-by-Step", "Guidance"]
    },
    {
        icon: Clock,
        title: "Quick Review Sessions",
        scenario: "Only have 15 minutes before class? Ask Lea4n to summarize the key points from yesterday's notes or generate a rapid-fire quiz on the most important concepts.",
        tags: ["Summaries", "Quick Quiz", "Key Points"]
    },
    {
        icon: Target,
        title: "Goal Tracking",
        scenario: "Tell Lea4n about your upcoming exams and homework deadlines. It remembers your goals and helps you stay focused on what matters most.",
        tags: ["Deadlines", "Focus", "Planning"]
    },
];

const subjectExamples = [
    { icon: Microscope, name: "Biology & Life Sciences", desc: "Cell biology, genetics, anatomy" },
    { icon: Calculator, name: "Mathematics", desc: "Calculus, algebra, statistics" },
    { icon: Globe, name: "History & Social Studies", desc: "World history, geography, economics" },
    { icon: Scale, name: "Law & Legal Studies", desc: "Constitutional law, case analysis" },
    { icon: Code, name: "Computer Science", desc: "Programming, algorithms, data structures" },
    { icon: Stethoscope, name: "Medicine & Health", desc: "Anatomy, pharmacology, clinical cases" },
];

export default function UseCasesPage() {
    return (
        <StaticPageLayout
            title="Use Cases"
            description="Discover how students use Lea4n to study smarter, prepare for exams, and master difficult concepts."
        >
            {/* Main Use Cases */}
            <section className="not-prose mb-20">
                <div className="grid gap-8 md:grid-cols-2">
                    {mainUseCases.map((useCase, index) => (
                        <Card
                            key={useCase.title}
                            className={`group relative overflow-hidden border-border/50 bg-gradient-to-br ${useCase.color} hover:shadow-xl transition-all duration-500`}
                        >
                            <CardContent className="p-8">
                                <div className={`inline-flex p-3 rounded-xl bg-background/80 border border-border/50 mb-6 ${useCase.iconColor}`}>
                                    <useCase.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {useCase.description}
                                </p>
                                <ul className="space-y-2">
                                    {useCase.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Student Scenarios */}
            <section className="not-prose mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Real Student Scenarios</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        See how Lea4n fits into your actual study workflow
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {studentScenarios.map((scenario) => (
                        <Card key={scenario.title} className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <scenario.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">{scenario.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    {scenario.scenario}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {scenario.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Subject Examples */}
            <section className="not-prose mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Works for Any Subject</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        From STEM to humanities, Lea4n adapts to whatever you&apos;re studying
                    </p>
                </div>

                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {subjectExamples.map((subject) => (
                        <div
                            key={subject.name}
                            className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <div className="p-3 rounded-lg bg-primary/10 mb-3">
                                <subject.icon className="h-5 w-5 text-primary" />
                            </div>
                            <h4 className="text-sm font-medium mb-1">{subject.name}</h4>
                            <p className="text-xs text-muted-foreground">{subject.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Features Summary */}
            <section className="not-prose mb-20">
                <Card className="bg-gradient-to-br from-muted/50 to-background border-border/50">
                    <CardContent className="p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">What Makes Lea4n Different</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Most AI tools give generic answers. Lea4n is built specifically for students,
                                    with features that actually help you learn—not just get answers.
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {[
                                        "Subject-scoped memory that persists across conversations",
                                        "Upload your actual course materials for context",
                                        "AI that explains concepts, not just generates text",
                                        "Powered by Google's Gemini 2.0 Flash model",
                                    ].map((point) => (
                                        <li key={point} className="flex items-start gap-3">
                                            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                            <span className="text-sm">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="p-6 rounded-xl bg-background/80 border border-border/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Upload className="h-5 w-5 text-primary" />
                                        <span className="font-medium">Supported File Types</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        PDF, Word (.docx), Images (JPG, PNG), Text files, and scanned documents with OCR
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl bg-background/80 border border-border/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Brain className="h-5 w-5 text-primary" />
                                        <span className="font-medium">Memory Categories</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Preferences, Facts, Progress, Corrections, Goals & Deadlines, Custom Notes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* CTA */}
            <section className="not-prose">
                <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 text-center">
                    <CardContent className="p-12">
                        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Ready to Study Smarter?</h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Join thousands of students using Lea4n to learn faster, understand deeper, and stress less.
                        </p>
                        <Link href="/signup">
                            <Button size="lg" className="gap-2 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all">
                                <Sparkles className="h-4 w-4" />
                                Get Started Free
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </StaticPageLayout>
    );
}
