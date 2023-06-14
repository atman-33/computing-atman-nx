import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptHelper from '../../shared/bcrypt-helper';
import { CreateUserDto } from '../auth/dtos/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

    /**
     * コンストラクタ
     */
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>) {
    }

    /**
     * ユーザー作成
     * @param createUserDto 
     * @returns 
     */
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password, role } = createUserDto;

        if(await this.findOne(username)) {
            throw new ConflictException('Username already exists');
        }

        const hashPassword = await bcryptHelper.generateHashedPassword(password);
        const user = new this.userModel({
            username,
            email,
            password: hashPassword,
            role: role
        });
        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).exec();
        return user;
    }

    async updatePassword(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).exec();

        if (!user) {
            throw new NotFoundException(`User with username '${username}' not found`);
        }

        const hashPassword = await bcryptHelper.generateHashedPassword(password);
        const updatedUser = await this.userModel.findOneAndUpdate(
            { username },
            { password: hashPassword },
            { new: true }
        );

        if (!updatedUser) {
            throw new NotFoundException(`Could not update password for user '${username}'`);
        }

        return updatedUser;
    }

    async delete(username: string): Promise<void> {
        const response = await this.userModel.deleteOne({ username }).exec();
        if (response.deletedCount === 0) {
            throw new NotFoundException('Could not find user');
        }
    }
}
