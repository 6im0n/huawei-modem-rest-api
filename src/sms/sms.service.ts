import { Injectable } from '@nestjs/common';
import { Connection, Sms } from 'huawei-lte-api';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = new Connection(process.env.HUAWEI_CONNECTION, 1000);

@Injectable()
export class SmsService {
  about() {
    return 'This is a sms service';
  }
  sendSms(phoneNumber: string, message: string) {
    const sms = new Sms(connection);
    sms.sendSms([phoneNumber], message).then(r => {
      console.log(r);
    });
    return `Sending sms to ${phoneNumber} with message: ${message}`;
  }
}
