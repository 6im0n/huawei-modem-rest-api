import {Body, Controller} from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from '../api-key/api-key.guard';
import { SmsService } from './sms.service';


@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService ) {}

  @Get('info')
  @UseGuards(ApiKeyGuard)
  getInfo() {
    return this.smsService.about();
  }

  @Post('send')
  @UseGuards(ApiKeyGuard)
  sendSms(@Body('phoneNumber') phoneNumber: string, @Body('message') message: string) {
    return this.smsService.sendSms(phoneNumber, message);
  }

}
