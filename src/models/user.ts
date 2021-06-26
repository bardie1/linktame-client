export interface User {
    id?: number;
    public_id: string;
    name: string;
    email: string;
    password?: string;
    admin?: boolean
}