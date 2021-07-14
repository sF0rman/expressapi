import nodemailer from 'nodemailer';
import { HTTPCode } from '../models/HTTPCodes';
import { ErrorResponse, ErrorType } from './errorHandler';

interface emailOptions {
    email: string;
    subject: string;
    text: string;
}

class EmailError extends ErrorResponse {
    name: ErrorType = ErrorType.EmailError;
    constructor() {
        super(HTTPCode.ServerError);
        this.message = 'Unable to send email';
    }
}

const sendEmail = async (options: emailOptions): Promise<void> => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      }
    });
  
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.text
    }
  
    const info = await transporter.sendMail(message);
    console.log('Message sent to %s', options.email);
  }

  export {
      emailOptions,
      EmailError,
      sendEmail
  }