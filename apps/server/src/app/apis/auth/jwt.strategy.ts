import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { EnvService } from '../../config/env.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    /**
     *
     */
    constructor(
        private readonly userService: UsersService,
        private readonly envService: EnvService) {
            
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envService.jwtSecret
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.userService.findOne(username);
        // console.log(username);

        if (user) {
            return user;
        }
        throw new UnauthorizedException();
    }
}