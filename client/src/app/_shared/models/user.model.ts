export class User {
    id: string;
    username: string;
    email: string;
    role: any;

    constructor(id: string, username: string, email: string, role?: any) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role || 'visitor';
    }
}
