// Mock authentication utilities for frontend-only auth
// Accepts any credentials

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

const USER_STORAGE_KEY = "lea4n_user";

// Generate a simple ID
function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

// Get the current user from localStorage
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

// Mock login - accepts any credentials
export function login(email: string, _password: string): User {
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const capitalizedName = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const user: User = {
        id: generateId(),
        name: capitalizedName,
        email,
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
}

// Mock signup - accepts any credentials
export function signup(name: string, email: string, _password: string): User {
    const user: User = {
        id: generateId(),
        name,
        email,
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
}

// Logout
export function logout(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return getUser() !== null;
}
