import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '../../config/env.module';
import { EnvService } from '../../config/env.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        secret: envService.jwtSecret,
        signOptions: { expiresIn: 3600 }, // unit: sec
      }),
      inject: [EnvService],
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard]
})
export class AuthModule { }
