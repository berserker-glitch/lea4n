"use client";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, ChevronRight, ChevronLeft, Sparkles, GraduationCap, Plus, Check } from "lucide-react";
import { onboardingApi, subjectsApi, UserSource } from "@/lib/api";
import { getUser } from "@/lib/auth";

const USER_SOURCES: { value: UserSource; label: string; icon: string }[] = [
    { value: "SOCIAL_MEDIA", label: "Social Media", icon: "📱" },
    { value: "FRIEND_REFERRAL", label: "Friend Referral", icon: "👥" },
    { value: "SEARCH_ENGINE", label: "Search Engine", icon: "🔍" },
    { value: "SCHOOL", label: "School/University", icon: "🏫" },
    { value: "YOUTUBE", label: "YouTube", icon: "📺" },
    { value: "OTHER", label: "Other", icon: "✨" },
];

export default function SetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(0); // 0: Welcome, 1: Questions, 2: Create Subject
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [selectedSource, setSelectedSource] = useState<UserSource | null>(null);
    const [institution, setInstitution] = useState("");
    const [subjectTitle, setSubjectTitle] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = getUser();
        if (user?.name) {
            setUserName(user.name);
        }
    }, []);

    const handleNext = async () => {
        setError(null);

        if (step === 0) {
            setStep(1);
        } else if (step === 1) {
            if (!selectedSource) {
                setError("Please select how you heard about us");
                return;
            }
            if (!institution.trim()) {
                setError("Please enter your institution");
                return;
            }

            setIsLoading(true);
            try {
                await onboardingApi.saveAnswers({
                    heardFrom: selectedSource,
                    institution: institution.trim(),
                });
                setStep(2);
            } catch (err: any) {
                setError(err.message || "Failed to save. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else if (step === 2) {
            if (!subjectTitle.trim()) {
                setError("Please enter a subject name");
                return;
            }

            setIsLoading(true);
            try {
                await subjectsApi.create({ title: subjectTitle.trim() });
                await onboardingApi.completeSetup();
                router.push("/dashboard");
            } catch (err: any) {
                setError(err.message || "Failed to create subject. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
        setError(null);
    };

    // Step 0: Welcome
    if (step === 0) {
        return (
            <AuthSplitLayout
                title={`Welcome${userName ? `, ${userName}` : ""}! 🎉`}
                description="Let's get you set up in just a few quick steps"
                testimonial={{
                    quote: "The setup was so quick! Within minutes I had my first subject ready and was already asking questions about my coursework.",
                    author: "Emily Rodriguez",
                    role: "Law Student, NYU"
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-primary" />
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold">Here&apos;s what we&apos;ll do:</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Answer a couple quick questions
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Create your first study subject
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                Start learning with AI
                            </li>
                        </ul>
                    </div>

                    <Button
                        onClick={handleNext}
                        size="lg"
                        className="w-full shadow-lg shadow-primary/20"
                    >
                        Let&apos;s Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        Takes less than 30 seconds
                    </p>
                </div>
            </AuthSplitLayout>
        );
    }

    // Step 1: Questions
    if (step === 1) {
        return (
            <AuthSplitLayout
                title="Tell us about yourself"
                description="This helps us improve your experience"
                testimonial={{
                    quote: "The personalized approach really shows. Lea4n understands exactly what I need as a student.",
                    author: "David Park",
                    role: "Engineering Student, MIT"
                }}
            >
                <div className="space-y-6">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-sm font-medium">How did you hear about us?</label>
                        <div className="grid grid-cols-2 gap-2">
                            {USER_SOURCES.map((source) => (
                                <button
                                    key={source.value}
                                    onClick={() => setSelectedSource(source.value)}
                                    className={`p-3 rounded-lg border-2 text-left transition-all ${selectedSource === source.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                        }`}
                                >
                                    <span className="mr-2">{source.icon}</span>
                                    <span className="text-sm font-medium">{source.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="institution" className="text-sm font-medium">
                            Your School or Institution
                        </label>
                        <Input
                            id="institution"
                            placeholder="e.g., Stanford University, MIT, Self-learning"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="bg-background"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleBack}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="flex-1 shadow-lg shadow-primary/20"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </AuthSplitLayout>
        );
    }

    // Step 2: Create Subject
    return (
        <AuthSplitLayout
            title="Create your first subject"
            description="What are you studying or learning about?"
            testimonial={{
                quote: "I created subjects for each of my courses and it completely transformed how I prepare for exams!",
                author: "Lisa Wang",
                role: "Medical Student, Johns Hopkins"
            }}
        >
            <div className="space-y-6">
                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-md">
                        {error}
                    </div>
                )}

                <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                </div>

                <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                        Subject Name
                    </label>
                    <Input
                        id="subject"
                        placeholder="e.g., Organic Chemistry, Machine Learning, History"
                        value={subjectTitle}
                        onChange={(e) => setSubjectTitle(e.target.value)}
                        className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">
                        You can add more subjects later from the dashboard
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBack}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNext}
                        className="flex-1 shadow-lg shadow-primary/20"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" />
                                Create & Continue
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AuthSplitLayout>
    );
}
