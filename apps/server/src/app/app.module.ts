import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './apis/auth/auth.module';
import { PostsModule } from './apis/posts/posts.module';
import { UsersModule } from './apis/users/users.module';
import { EnvModule } from './config/env.module';
import { EnvService } from './config/env.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    EnvModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => ({
        uri: envService.dbUri
      }),
      inject: [EnvService]
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
