import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/interfaces/user.interface';

/**
 * CanActivate: Guardとして機能させるために必要 ※補足: AuthGuardはCanActivateを継承しているため不要
 */
@Injectable()
export class RolesGuard implements CanActivate {
    /**
     * 
     * @param reflector // Reflector: デコレーターでセットしたメタデータを取得
     */
    constructor(private reflector: Reflector) {
    }

    canActivate(ctx: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            ctx.getHandler(),
        );

        // デコレーターに何も指定されていない場合は実行を許可
        if (!requiredRoles) {
            return true;
        }

        // ユーザーのroleが、メタデータから取得したrolesのいずれかに一致すれば実行を許可
        const { user } = ctx.switchToHttp().getRequest() as { user: User; };
        return requiredRoles.some((role) => user.role.includes(role));
    }
}