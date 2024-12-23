import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10
    }]),
    ConfigModule.forRoot()
  ],
  controllers: [ AppController ],
  providers: [ 
    AppService, 
    { provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
