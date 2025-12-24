"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUser, User } from "./auth";

// Types
export interface Conversation {
    id: string;
    title: string;
    subjectId: string;
    messages: Message[];
    isPinned?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export interface Subject {
    id: string;
    name: string;
    color: string;
    conversations: Conversation[];
    isPinned?: boolean;
    createdAt: Date;
}

export type FileTag = "Exam" | "Exercise" | "Course";

export interface FileItem {
    id: string;
    name: string;
    type: "pdf" | "image" | "video" | "audio" | "document" | "other";
    size: string;
    subjectId: string;
    tag?: FileTag;
    uploadedAt: Date;
    thumbnailUrl?: string;
}

interface AppState {
    user: User | null;
    subjects: Subject[];
    files: FileItem[];
    currentView: "chat" | "files";
    currentSubjectId: string | null;
    currentConversationId: string | null;
    sidebarOpen: boolean;
}

interface AppContextValue extends AppState {
    setUser: (user: User | null) => void;
    setCurrentView: (view: "chat" | "files") => void;
    setCurrentSubjectId: (id: string | null) => void;
    setCurrentConversationId: (id: string | null) => void;
    setSidebarOpen: (open: boolean) => void;
    addSubject: (name: string, color: string) => Subject;
    addConversation: (subjectId: string, title: string) => Conversation;
    addMessage: (conversationId: string, role: "user" | "assistant", content: string) => Message;
    addFile: (file: Omit<FileItem, "id" | "uploadedAt">) => FileItem;
    deleteFile: (fileId: string) => void;
    togglePinSubject: (subjectId: string) => void;
    togglePinConversation: (subjectId: string, conversationId: string) => void;
    setFileTag: (fileId: string, tag: FileTag) => void;
    getCurrentSubject: () => Subject | undefined;
    getCurrentConversation: () => Conversation | undefined;
    getSubjectFiles: (subjectId: string) => FileItem[];
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Sample data
const sampleSubjects: Subject[] = [
    {
        id: "1",
        name: "Mathematics",
        color: "bg-chart-4",
        isPinned: true,
        conversations: [
            {
                id: "1-1",
                title: "Calculus Integration",
                subjectId: "1",
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: "1-2",
                title: "Linear Algebra Help",
                subjectId: "1",
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
    },
    {
        id: "2",
        name: "Physics",
        color: "bg-chart-1",
        conversations: [
            {
                id: "2-1",
                title: "Quantum Mechanics",
                subjectId: "2",
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
    },
    {
        id: "3",
        name: "Chemistry",
        color: "bg-chart-2",
        conversations: [],
        createdAt: new Date(),
    },
    {
        id: "4",
        name: "Computer Science",
        color: "bg-chart-3",
        conversations: [
            {
                id: "4-1",
                title: "Algorithms & Data Structures",
                subjectId: "4",
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
        createdAt: new Date(),
    },
];

const sampleFiles: FileItem[] = [
    {
        id: "f1",
        name: "Calculus Textbook.pdf",
        type: "pdf",
        size: "15.2 MB",
        subjectId: "1",
        tag: "Course",
        uploadedAt: new Date(),
    },
    {
        id: "f2",
        name: "Lecture Notes Week 1.pdf",
        type: "pdf",
        size: "2.4 MB",
        subjectId: "1",
        tag: "Course",
        uploadedAt: new Date(),
    },
    {
        id: "f3",
        name: "Practice Problems.pdf",
        type: "document",
        size: "890 KB",
        subjectId: "1",
        tag: "Exercise",
        uploadedAt: new Date(),
    },
    {
        id: "f4",
        name: "Physics Lab Report.pdf",
        type: "pdf",
        size: "1.2 MB",
        subjectId: "2",
        tag: "Exam",
        uploadedAt: new Date(),
    },
];

function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>({
        user: null,
        subjects: sampleSubjects,
        files: sampleFiles,
        currentView: "chat",
        currentSubjectId: null,
        currentConversationId: null,
        sidebarOpen: true,
    });

    useEffect(() => {
        const user = getUser();
        if (user) {
            setState((prev) => ({ ...prev, user }));
        }
    }, []);

    const setUser = (user: User | null) => {
        setState((prev) => ({ ...prev, user }));
    };

    const setCurrentView = (view: "chat" | "files") => {
        setState((prev) => ({ ...prev, currentView: view }));
    };

    const setCurrentSubjectId = (id: string | null) => {
        setState((prev) => ({ ...prev, currentSubjectId: id }));
    };

    const setCurrentConversationId = (id: string | null) => {
        setState((prev) => ({ ...prev, currentConversationId: id }));
    };

    const setSidebarOpen = (open: boolean) => {
        setState((prev) => ({ ...prev, sidebarOpen: open }));
    };

    const addSubject = (name: string, color: string): Subject => {
        const subject: Subject = {
            id: generateId(),
            name,
            color,
            conversations: [],
            createdAt: new Date(),
        };
        setState((prev) => ({
            ...prev,
            subjects: [...prev.subjects, subject],
        }));
        return subject;
    };

    const addConversation = (subjectId: string, title: string): Conversation => {
        const conversation: Conversation = {
            id: generateId(),
            title,
            subjectId,
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setState((prev) => ({
            ...prev,
            subjects: prev.subjects.map((s) =>
                s.id === subjectId
                    ? { ...s, conversations: [...s.conversations, conversation] }
                    : s
            ),
        }));
        return conversation;
    };

    const addMessage = (
        conversationId: string,
        role: "user" | "assistant",
        content: string
    ): Message => {
        const message: Message = {
            id: generateId(),
            role,
            content,
            timestamp: new Date(),
        };
        setState((prev) => ({
            ...prev,
            subjects: prev.subjects.map((s) => ({
                ...s,
                conversations: s.conversations.map((c) =>
                    c.id === conversationId
                        ? { ...c, messages: [...c.messages, message], updatedAt: new Date() }
                        : c
                ),
            })),
        }));
        return message;
    };

    const addFile = (file: Omit<FileItem, "id" | "uploadedAt">): FileItem => {
        const newFile: FileItem = {
            ...file,
            id: generateId(),
            uploadedAt: new Date(),
        };
        setState((prev) => ({
            ...prev,
            files: [...prev.files, newFile],
        }));
        return newFile;
    };

    const deleteFile = (fileId: string) => {
        setState((prev) => ({
            ...prev,
            files: prev.files.filter((f) => f.id !== fileId),
        }));
    };

    const togglePinSubject = (subjectId: string) => {
        setState((prev) => ({
            ...prev,
            subjects: prev.subjects.map((s) =>
                s.id === subjectId ? { ...s, isPinned: !s.isPinned } : s
            ),
        }));
    };

    const togglePinConversation = (subjectId: string, conversationId: string) => {
        setState((prev) => ({
            ...prev,
            subjects: prev.subjects.map((s) =>
                s.id === subjectId
                    ? {
                        ...s,
                        conversations: s.conversations.map((c) =>
                            c.id === conversationId ? { ...c, isPinned: !c.isPinned } : c
                        ),
                    }
                    : s
            ),
        }));
    };

    const setFileTag = (fileId: string, tag: FileTag) => {
        setState((prev) => ({
            ...prev,
            files: prev.files.map((f) =>
                f.id === fileId ? { ...f, tag } : f
            ),
        }));
    };

    const getCurrentSubject = (): Subject | undefined => {
        return state.subjects.find((s) => s.id === state.currentSubjectId);
    };

    const getCurrentConversation = (): Conversation | undefined => {
        for (const subject of state.subjects) {
            const conversation = subject.conversations.find(
                (c) => c.id === state.currentConversationId
            );
            if (conversation) return conversation;
        }
        return undefined;
    };

    const getSubjectFiles = (subjectId: string): FileItem[] => {
        return state.files.filter((f) => f.subjectId === subjectId);
    };

    const value: AppContextValue = {
        ...state,
        setUser,
        setCurrentView,
        setCurrentSubjectId,
        setCurrentConversationId,
        setSidebarOpen,
        addSubject,
        addConversation,
        addMessage,
        addFile,
        deleteFile,
        togglePinSubject,
        togglePinConversation,
        setFileTag,
        getCurrentSubject,
        getCurrentConversation,
        getSubjectFiles,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
