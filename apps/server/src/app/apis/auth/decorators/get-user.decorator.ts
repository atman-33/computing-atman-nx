import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * 認証したユーザー情報を取得
 * ※jwt.strategy.ts の validate メソッドで取得された user 情報を取得。
 *   そのため、認証後のユーザーでないと情報を取得できないため注意。
 */
export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});