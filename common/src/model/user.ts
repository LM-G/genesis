export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    actif?: boolean;
}