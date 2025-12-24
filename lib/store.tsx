"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { getUser, User, isAuthenticated, logout as authLogout } from "./auth";
import {
    subjectsApi,
    conversationsApi,
    SubjectResponse,
    ConversationResponse,
    ApiError,
} from "./api";

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
    isLoading: boolean;
    error: string | null;
}

interface AppContextValue extends AppState {
    setUser: (user: User | null) => void;
    setCurrentView: (view: "chat" | "files") => void;
    setCurrentSubjectId: (id: string | null) => void;
    setCurrentConversationId: (id: string | null) => void;
    setSidebarOpen: (open: boolean) => void;
    addSubject: (name: string, color: string) => Promise<Subject | null>;
    addConversation: (subjectId: string, title: string) => Promise<Conversation | null>;
    addMessage: (conversationId: string, role: "user" | "assistant", content: string) => Message;
    addFile: (file: Omit<FileItem, "id" | "uploadedAt">) => FileItem;
    deleteFile: (fileId: string) => void;
    deleteSubject: (subjectId: string) => Promise<void>;
    deleteConversation: (conversationId: string) => Promise<void>;
    togglePinSubject: (subjectId: string) => void;
    togglePinConversation: (subjectId: string, conversationId: string) => void;
    setFileTag: (fileId: string, tag: FileTag) => void;
    getCurrentSubject: () => Subject | undefined;
    getCurrentConversation: () => Conversation | undefined;
    getSubjectFiles: (subjectId: string) => FileItem[];
    refreshData: () => Promise<void>;
    logout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Color palette for subjects
const SUBJECT_COLORS = [
    "bg-chart-1",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
];

function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

// Convert API response to local Subject type
function mapSubjectResponse(
    subject: SubjectResponse,
    conversations: Conversation[] = []
): Subject {
    return {
        id: subject.id,
        name: subject.title,
        color: SUBJECT_COLORS[Math.floor(Math.random() * SUBJECT_COLORS.length)],
        conversations,
        createdAt: new Date(subject.createdAt),
    };
}

// Convert API response to local Conversation type
function mapConversationResponse(conv: ConversationResponse): Conversation {
    return {
        id: conv.id,
        title: conv.title,
        subjectId: conv.subjectId,
        messages: conv.messages?.map((m) => ({
            id: m.id,
            role: m.role.toLowerCase() as "user" | "assistant",
            content: m.content,
            timestamp: new Date(m.createdAt),
        })) || [],
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
    };
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppState>({
        user: null,
        subjects: [],
        files: [],
        currentView: "chat",
        currentSubjectId: null,
        currentConversationId: null,
        sidebarOpen: true,
        isLoading: true,
        error: null,
    });

    // Fetch all data from API
    const refreshData = useCallback(async () => {
        if (!isAuthenticated()) {
            setState((prev) => ({ ...prev, isLoading: false, subjects: [], files: [] }));
            return;
        }

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            // Fetch subjects
            const subjectsResponse = await subjectsApi.list({ limit: 100 });
            const subjectsData = subjectsResponse.data || [];

            // Fetch conversations for each subject
            const subjectsWithConversations: Subject[] = await Promise.all(
                subjectsData.map(async (subject) => {
                    try {
                        const convsResponse = await conversationsApi.listBySubject(subject.id, {
                            limit: 100,
                        });
                        const conversations = (convsResponse.data || []).map(mapConversationResponse);
                        return mapSubjectResponse(subject, conversations);
                    } catch {
                        return mapSubjectResponse(subject, []);
                    }
                })
            );

            setState((prev) => ({
                ...prev,
                subjects: subjectsWithConversations,
                isLoading: false,
            }));
        } catch (error) {
            const message = error instanceof ApiError ? error.message : "Failed to load data";
            setState((prev) => ({ ...prev, error: message, isLoading: false }));
        }
    }, []);

    // Initialize user and fetch data
    useEffect(() => {
        const user = getUser();
        if (user) {
            setState((prev) => ({ ...prev, user }));
            refreshData();
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [refreshData]);

    const setUser = (user: User | null) => {
        setState((prev) => ({ ...prev, user }));
        if (user) {
            refreshData();
        }
    };

    const logout = () => {
        authLogout();
        setState((prev) => ({
            ...prev,
            user: null,
            subjects: [],
            files: [],
            currentSubjectId: null,
            currentConversationId: null,
        }));
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

    const addSubject = async (name: string, color: string): Promise<Subject | null> => {
        try {
            const response = await subjectsApi.create({ title: name });
            if (response.data) {
                const subject: Subject = {
                    id: response.data.id,
                    name: response.data.title,
                    color,
                    conversations: [],
                    createdAt: new Date(response.data.createdAt),
                };
                setState((prev) => ({
                    ...prev,
                    subjects: [...prev.subjects, subject],
                }));
                return subject;
            }
            return null;
        } catch (error) {
            console.error("Failed to create subject:", error);
            return null;
        }
    };

    const deleteSubject = async (subjectId: string): Promise<void> => {
        try {
            await subjectsApi.delete(subjectId);
            setState((prev) => ({
                ...prev,
                subjects: prev.subjects.filter((s) => s.id !== subjectId),
                currentSubjectId:
                    prev.currentSubjectId === subjectId ? null : prev.currentSubjectId,
                currentConversationId: prev.subjects.find((s) => s.id === subjectId)
                    ?.conversations.some((c) => c.id === prev.currentConversationId)
                    ? null
                    : prev.currentConversationId,
            }));
        } catch (error) {
            console.error("Failed to delete subject:", error);
        }
    };

    const addConversation = async (
        subjectId: string,
        title: string
    ): Promise<Conversation | null> => {
        try {
            const response = await conversationsApi.create(subjectId, { title });
            if (response.data) {
                const conversation: Conversation = {
                    id: response.data.id,
                    title: response.data.title,
                    subjectId,
                    messages: [],
                    createdAt: new Date(response.data.createdAt),
                    updatedAt: new Date(response.data.updatedAt),
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
            }
            return null;
        } catch (error) {
            console.error("Failed to create conversation:", error);
            return null;
        }
    };

    const deleteConversation = async (conversationId: string): Promise<void> => {
        try {
            await conversationsApi.delete(conversationId);
            setState((prev) => ({
                ...prev,
                subjects: prev.subjects.map((s) => ({
                    ...s,
                    conversations: s.conversations.filter((c) => c.id !== conversationId),
                })),
                currentConversationId:
                    prev.currentConversationId === conversationId
                        ? null
                        : prev.currentConversationId,
            }));
        } catch (error) {
            console.error("Failed to delete conversation:", error);
        }
    };

    // Messages are stored locally for now (backend message API can be added later)
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

    // Files are stored locally for now (file upload API can be added later)
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
            files: prev.files.map((f) => (f.id === fileId ? { ...f, tag } : f)),
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
        deleteSubject,
        deleteConversation,
        togglePinSubject,
        togglePinConversation,
        setFileTag,
        getCurrentSubject,
        getCurrentConversation,
        getSubjectFiles,
        refreshData,
        logout,
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
