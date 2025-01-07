import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  about() {
    return 'This is a sms service';
  }
  sendSms(phoneNumber: string, message: string) {
    return `Sending sms to ${phoneNumber} with message: ${message}`;
  }

}
