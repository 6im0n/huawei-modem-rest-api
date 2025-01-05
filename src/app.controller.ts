import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './api-key/api-key.guard';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(AuthGuard)
  getProtectedData() {
    return { message: 'You have access!' };
  }
}

@Controller('secure')
export class SecureController {
  @Get()
  @UseGuards(ApiKeyGuard)
  getSecureData() {
    return { message: 'You have access!' };
  }
}
