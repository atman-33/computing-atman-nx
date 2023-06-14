import { UserRole } from '../enums/user-role.enum';

export interface User {
    username: string;
    email: string;
    password: string;
    role: UserRole;
}