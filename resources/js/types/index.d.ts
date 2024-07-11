export interface User {
    id: number;
    username: string;
    name: string;
    email?: string;
    email_verified_at?: string | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
