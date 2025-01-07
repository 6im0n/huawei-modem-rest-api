import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyService } from './api-key/api-key.service';
import { PrismaService } from './prisma/prisma.service';
import { ApiKeyController } from './api-key/api-key.controller';
import { FirebaseService } from './firebase/firebase.service';
import { UsersController } from './firebase/users.controller';
import { SmsService } from './sms/sms.service';
import { SmsController } from './sms/sms.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ApiKeyController,
    UsersController,
    SmsController,
  ],
  providers: [
    AppService,
    ApiKeyService,
    PrismaService,
    FirebaseService,
    SmsService,
  ],
})
export class AppModule {}
