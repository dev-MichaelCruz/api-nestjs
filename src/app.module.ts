import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { error } from 'console';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ 
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10
    }])
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
