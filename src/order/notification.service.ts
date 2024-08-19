import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as twilio from 'twilio';

@Injectable()
export class NotificationService {
  private transporter: { sendMail: (arg0: { from: string; to: string; subject: string; text: string; }) => any; };
  private twilioClient: import("twilio/lib/rest/Twilio");

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'taskerrs82@gmail.com',
        pass: 'exvg yrii htsf cvhg',
      },
    });

    // this.twilioClient = twilio('ACac3364d22c335308eb1a98e687457502', 'ac6d9eff55a22106d33a5c4fc935ee2c');
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'taskerrs82@gmail.com',
      to,
      subject,
      text,
    };
    
    await this.transporter.sendMail(mailOptions);
  }

//   async sendSMS(to: string, body: string) {
//     await this.twilioClient.messages.create({
//       to,
//       from: 'your-twilio-phone-number',
//       body,
//     });
//   }
}
