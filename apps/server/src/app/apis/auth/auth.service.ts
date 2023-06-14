import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';

@Injectable()
export class AuthService {

    /**
     *
     */
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService) {
    }

    /**
     * ユーザー登録
     * @param createUserDto 
     * @returns 
     */
    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    /**
     * ユーザーログイン
     * @param credentialsDto 
     * @returns 
     */
    async signIn(credentialsDto: CredentialsDto): Promise<{ accessToken: string; }> {
        const { username, password } = credentialsDto;
        const user = await this.usersService.findOne(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username: user.username };
            const accessToken = await this.jwtService.sign(payload);
            // console.log(`sign in: ${user.username}`);

            return { accessToken };
        }
        throw new UnauthorizedException('Please confirm your username or password');
    }
}
