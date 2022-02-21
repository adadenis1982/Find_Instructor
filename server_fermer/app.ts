import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session, { Store } from 'express-session';
import { PrismaClient } from '@prisma/client';

import { router as mapRouter } from './routes/map';
import { router as authRouter } from './routes/auth';
import { router as usersRouter } from './routes/users';
import { router as advertRouter } from './routes/advert';
import { router as searchRouter } from './routes/search';
import { router as commentRouter } from './routes/comment';
import { router as chatRouter } from './routes/chat';
import { router as bookingRouter } from './routes/booking';
import { router as subscriptionRouter } from './routes/subscription';

import { sessionMiddle } from './middlewares';

export const prisma = new PrismaClient();

dotenv.config();

const app: any = express();
const PORT: number | string = process.env.PORT || 5000;

const sessionStore: Store = new session.MemoryStore();

type SessionOptions = {
  name: string;
  store: Store;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: {
    expires: any;
    httpOnly: boolean;
  };
};

const sessionConfig = <SessionOptions>{
  name: 'sid',
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
};
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(sessionConfig));

app.use(sessionMiddle);

app.use('/', authRouter);
app.use('/map', mapRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/adverts', advertRouter);
app.use('/comments', commentRouter);
app.use('/bookings', bookingRouter);
app.use('/chat', chatRouter);
app.use('/subscription', subscriptionRouter);

app.listen(PORT, () => {
  console.log(`It's all good in da hood: ${PORT}`);
});
