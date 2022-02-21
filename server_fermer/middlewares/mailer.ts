import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// mail
const transporter: Transporter = nodemailer.createTransport(
  {
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  {
    from: `Find Instructor <justworkout@mail.ru>`,
  },
);

// console.log('transporter', transporter);
// console.log('process.env', process.env);

const mailer = (message: object) => {
  transporter.sendMail(message, (err: any, info: any) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

export default mailer;
