import { UserRole } from '@libs/shared/domain';
import mongoose from 'mongoose';

export interface User extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    role: UserRole;
}