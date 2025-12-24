/**
 * Authentication utilities using the backend API
 */
import { authApi, getToken, removeToken, ApiError } from "./api";

export interface User {
    id: string;
    name: string | null;
    email: string;
    createdAt?: string;
}

const USER_STORAGE_KEY = "lea4n_user";

/**
 * Get the current user from localStorage
 */
export function getUser(): User | null {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as User;
    } catch {
        return null;
    }
}

/**
 * Store user in localStorage
 */
function setUser(user: User): void {
    if (typeof window !== "undefined") {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
}

/**
 * Remove user from localStorage
 */
function clearUser(): void {
    if (typeof window !== "undefined") {
        localStorage.removeItem(USER_STORAGE_KEY);
    }
}

/**
 * Login with email and password
 */
export async function login(
    email: string,
    password: string
): Promise<{ user: User; error?: string }> {
    try {
        const response = await authApi.login({ email, password });

        if (response.data) {
            const user: User = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                createdAt: response.data.user.createdAt,
            };
            setUser(user);
            return { user };
        }

        return { user: null as unknown as User, error: "Login failed" };
    } catch (error) {
        if (error instanceof ApiError) {
            return { user: null as unknown as User, error: error.message };
        }
        return { user: null as unknown as User, error: "Network error. Please try again." };
    }
}

/**
 * Signup with name, email and password
 */
export async function signup(
    name: string,
    email: string,
    password: string
): Promise<{ user: User; error?: string }> {
    try {
        const response = await authApi.register({ email, password, name });

        if (response.data) {
            const user: User = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                createdAt: response.data.user.createdAt,
            };
            setUser(user);
            return { user };
        }

        return { user: null as unknown as User, error: "Signup failed" };
    } catch (error) {
        if (error instanceof ApiError) {
            return { user: null as unknown as User, error: error.message };
        }
        return { user: null as unknown as User, error: "Network error. Please try again." };
    }
}

/**
 * Logout
 */
export function logout(): void {
    clearUser();
    removeToken();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return getUser() !== null && getToken() !== null;
}

/**
 * Fetch current user profile from API
 */
export async function fetchProfile(): Promise<User | null> {
    try {
        const response = await authApi.getProfile();
        if (response.data) {
            const user: User = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                createdAt: response.data.createdAt,
            };
            setUser(user);
            return user;
        }
        return null;
    } catch {
        return null;
    }
}
