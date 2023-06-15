import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * このGuardが適用されたリクエストハンドラは、
 * jwt認証に通過していない場合に実行されない。
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}