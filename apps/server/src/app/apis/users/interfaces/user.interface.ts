import mongoose from 'mongoose';
import { UserRole } from 'libs/src/shared/enums/user-role.enum';

export interface User extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    role: UserRole;
}