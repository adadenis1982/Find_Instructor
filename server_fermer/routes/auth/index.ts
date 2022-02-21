import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { User } from '@prisma/client';
import mailer from '../../middlewares/mailer';
import { createRegEmail } from '../../middlewares/mailCreator';
// import { authCheck } from '../../middlewares';

import { prisma } from '../../app';

const router = express.Router();

router.get('/isAuthorized', async (req: Request, res: Response) => {
  if (res.locals.isAuthorized) {
    return res.json({
      id: res.locals.id,
      username: res.locals.username,
      email: res.locals.email,
      isAuthorized: res.locals.isAuthorized,
    });
  }
  return res.json({ isAuthorized: res.locals.isAuthorized });
});

router.post('/register', async (req: Request, res: Response) => {
  let checkedUser: User | null;
  try {
    checkedUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
  } catch (error) {
    res.json({ data: error });
    return;
  }

  if (checkedUser) {
    res.status(401).json({
      error: {
        registration: false,
        message: 'такой email уже зарегистрирован',
      },
    });
    return;
  }

  const passwordHash: string = await bcrypt.hash(
    req.body.password,
    Number(process.env.SALT),
  );
  let newUser: User;

  try {
    newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
      },
    });
  } catch (error) {
    res.json({ data: error });
    return;
  }

  req.session.user = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
  };
  res.json({
    registration: true,
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
  });

  const message = {
    to: `${newUser.email}`,
    subject: 'Успешная регистрация',
    html: createRegEmail(newUser),
  };

  mailer(message);
});

router.post('/login', async (req: Request, res: Response) => {
  let user: User | null;

  try {
    user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
  } catch (error) {
    res.json({ data: error });
    return;
  }

  if (!user) {
    res.json({ data: { login: false, message: 'Неверно введены данные' } });
    return;
  }

  let isCompared;
  try {
    isCompared = await bcrypt.compare(req.body.password, user.password);
  } catch (error) {
    res.json({ data: error });
  }

  if (!isCompared) {
    res
      .status(401)
      .json({ data: { login: false, message: 'Неверный пароль' } });
    return;
  }

  req.session.user = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  res.json({
    login: true,
    id: user.id,
    username: user.username,
    email: user.email,
  });
});

router.delete('/logout', (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ data: error });
    }
    return res.status(200).json({ logout: true });
  });

  return res.clearCookie('sid');
});

export { router };
