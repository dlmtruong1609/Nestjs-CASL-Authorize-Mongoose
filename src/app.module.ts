import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { CaslModule } from './casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './articles/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CaslModule,
    ArticleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
