"use client";

import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

// Import the SubjectPage component to reuse its UI
import SubjectPage from "../page";

/**
 * Conversation Page - /dashboard/[subjectId]/[conversationId]
 * This page sets the conversationId in state and renders the same UI as SubjectPage
 * The URL reflects the conversation being viewed while keeping the chat/files toggle
 */
export default function ConversationPage() {
    const params = useParams();
    const { setCurrentConversationId, setCurrentSubjectId, currentSubjectId } = useApp();

    const subjectId = params.subjectId as string;
    const conversationId = params.conversationId as string;

    // Set current IDs when URL changes
    useEffect(() => {
        if (subjectId && currentSubjectId !== subjectId) {
            setCurrentSubjectId(subjectId);
        }
        if (conversationId) {
            setCurrentConversationId(conversationId);
        }
    }, [subjectId, conversationId, currentSubjectId, setCurrentSubjectId, setCurrentConversationId]);

    // Render the same UI as SubjectPage (with chat/files toggle)
    return <SubjectPage />;
}
