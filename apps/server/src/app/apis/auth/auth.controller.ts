import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '../users/interfaces/user.interface';
import { CredentialsDto } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {

    /**
     *
     */
    constructor(private readonly authSurvice: AuthService) {
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authSurvice.signUp(createUserDto);
    }

    @Post('signin')
    async create(@Body() credentialsDto: CredentialsDto): Promise<{ accessToken: string; }> {
        return await this.authSurvice.signIn(credentialsDto);
    }
}
