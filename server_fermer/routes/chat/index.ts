import express, { Request, Response } from 'express';
import { Advert, User, Chat } from '@prisma/client';
import { StreamChat } from 'stream-chat';
import { prisma } from '../../app';
import { authCheck } from '../../middlewares';
// import { authCheck } from '../../middlewares';

const router = express.Router();
const serverClient = StreamChat.getInstance(
  process.env.API_KEY ?? 'no_key',
  process.env.API_SECRET ?? 'no_key',
);

router.get('/token', authCheck, async (req: Request, res: Response) => {
  let user: User | null;

  try {
    user = await prisma.user.findUnique({
      where: { id: res.locals.user.id },
    });
    if (user && user.token) {
      res.json({ token: user.token });
      return;
    }
    if (user) {
      const token: string = serverClient.createToken(user.id);
      await prisma.user.update({
        where: {
          id: res.locals.user.id,
        },
        data: {
          token,
        },
      });
      res.json({ token });
      return;
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
    return;
  }
  res.sendStatus(500);
  console.log('Undefined error in chat index /token!~!!!!!!!!!');
});

router.get(
  '/channel/:advertId',
  authCheck,
  async (req: Request, res: Response) => {
    const chat: Chat | null = await prisma.chat.findFirst({
      where: {
        advert_id: req.params.advertId,
        user_id: res.locals.user.id,
      },
    });
    if (!chat) {
      console.log('NECHAT!');
    }
  },
);

export { router };
