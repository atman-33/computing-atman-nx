import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserRole } from 'libs/src/shared/enums/user-role.enum';
import { Role } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':username')
    async findOne(@Param('username') username: string): Promise<User> {
        return await this.usersService.findOne(username);
    }

    @Patch(':username/password')
    @UseGuards(JwtAuthGuard)
    async updatePassword(
        @Param('username') username: string,
        @Body() changePasswordDto: ChangePasswordDto,
    ): Promise<User> {
        const { password } = changePasswordDto;
        return await this.usersService.updatePassword(username, password);
    }

    @Delete(':username')
    @Role(UserRole.ADMINISTRATOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async delete(
        @Param('username') username: string,
        // @GetUser() user: User,
    ): Promise<void> {
        // console.log(user);
        return await this.usersService.delete(username);
    }
}
