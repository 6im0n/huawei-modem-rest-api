import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../api-key/api-key.guard';

@Controller('sms')
export class SmsController {
  constructor() {}

  @Get('info')
  @UseGuards(ApiKeyGuard)
  getInfo(): { message: string } {
    return { message: 'this is the sms module' };
  }
}
