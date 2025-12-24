/**
 * API configuration and HTTP client for backend communication
 */

// API base URL - defaults to localhost:4000 for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Token storage key
const TOKEN_KEY = "lea4n_token";

/**
 * Get stored auth token
 */
export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Store auth token
 */
export function setToken(token: string): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
    }
}

/**
 * Remove auth token
 */
export function removeToken(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
    }
}

/**
 * API response types
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        message: string;
        code?: string;
        statusCode: number;
    };
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface AuthUser {
    id: string;
    email: string;
    name: string | null;
    createdAt: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

export interface SubjectResponse {
    id: string;
    title: string;
    description: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        conversations: number;
    };
}

export interface ConversationResponse {
    id: string;
    title: string;
    subjectId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    subject?: {
        id: string;
        title: string;
    };
    messages?: MessageResponse[];
    _count: {
        messages: number;
    };
}

export interface MessageResponse {
    id: string;
    content: string;
    role: "USER" | "ASSISTANT" | "SYSTEM";
    createdAt: string;
    conversationId: string;
}

/**
 * Custom API error
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public code?: string
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Make an API request
 */
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const data: ApiResponse<T> = await response.json();

        if (!response.ok) {
            throw new ApiError(
                data.error?.message || "Request failed",
                response.status,
                data.error?.code
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
            error instanceof Error ? error.message : "Network error",
            0,
            "NETWORK_ERROR"
        );
    }
}

// ===========================================
// AUTH API
// ===========================================

export const authApi = {
    async register(data: { email: string; password: string; name?: string }) {
        const response = await request<AuthResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (response.data?.token) {
            setToken(response.data.token);
        }
        return response;
    },

    async login(data: { email: string; password: string }) {
        const response = await request<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (response.data?.token) {
            setToken(response.data.token);
        }
        return response;
    },

    async getProfile() {
        return request<AuthUser>("/auth/me");
    },

    async updateProfile(data: { name?: string }) {
        return request<AuthUser>("/auth/me", {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async changePassword(data: { currentPassword: string; newPassword: string }) {
        return request("/auth/change-password", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    logout() {
        removeToken();
    },
};

// ===========================================
// SUBJECTS API
// ===========================================

export const subjectsApi = {
    async list(params?: { page?: number; limit?: number; search?: string }) {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.search) searchParams.set("search", params.search);

        const query = searchParams.toString();
        return request<SubjectResponse[]>(`/subjects${query ? `?${query}` : ""}`);
    },

    async get(subjectId: string) {
        return request<SubjectResponse>(`/subjects/${subjectId}`);
    },

    async create(data: { title: string; description?: string }) {
        return request<SubjectResponse>("/subjects", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async update(subjectId: string, data: { title?: string; description?: string }) {
        return request<SubjectResponse>(`/subjects/${subjectId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async delete(subjectId: string) {
        return request(`/subjects/${subjectId}`, {
            method: "DELETE",
        });
    },
};

// ===========================================
// CONVERSATIONS API
// ===========================================

export const conversationsApi = {
    async list(params?: { page?: number; limit?: number; search?: string }) {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.search) searchParams.set("search", params.search);

        const query = searchParams.toString();
        return request<ConversationResponse[]>(`/conversations${query ? `?${query}` : ""}`);
    },

    async listBySubject(
        subjectId: string,
        params?: { page?: number; limit?: number; search?: string }
    ) {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", String(params.page));
        if (params?.limit) searchParams.set("limit", String(params.limit));
        if (params?.search) searchParams.set("search", params.search);

        const query = searchParams.toString();
        return request<ConversationResponse[]>(
            `/subjects/${subjectId}/conversations${query ? `?${query}` : ""}`
        );
    },

    async get(conversationId: string) {
        return request<ConversationResponse>(`/conversations/${conversationId}`);
    },

    async create(subjectId: string, data: { title: string }) {
        return request<ConversationResponse>(`/subjects/${subjectId}/conversations`, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async update(conversationId: string, data: { title?: string }) {
        return request<ConversationResponse>(`/conversations/${conversationId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    async delete(conversationId: string) {
        return request(`/conversations/${conversationId}`, {
            method: "DELETE",
        });
    },
};
