import { SetMetadata } from '@nestjs/common';

/**
 * 認可が必要なロールを受け取り、メタデータに登録
 * （メタデータはguardで取得して認可処理）
 * @param roles 
 * @returns 
 */
export const Role = (...roles: string[]) => SetMetadata('roles', roles);