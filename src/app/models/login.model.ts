export interface Login {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export interface NewLogin {
    name: string
    email: string;
    password: string;
}