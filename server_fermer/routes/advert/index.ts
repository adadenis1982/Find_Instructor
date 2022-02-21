import express, { Request, Response } from 'express';
import { Advert, User } from '@prisma/client';
import { prisma } from '../../app';
// import { authCheck } from '../../middlewares';

const router = express.Router();

router.get('/:advertId', async (req: Request, res: Response) => {
  let advert: Advert | null;
  try {
    advert = await prisma.advert.findUnique({
      where: { id: req.params.advertId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            photo: true,
            token: true,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
    return;
  }
  res.json(advert);
});

router.post('/', async (req: Request, res: Response) => {
  const { sport_type, city, title, content, price, duration_min, user_id } =
    req.body;
  let advert: Advert;
  let user: User;

  try {
    advert = await prisma.advert.create({
      data: {
        sport_type,
        city,
        title,
        content,
        price: Number(price),
        duration_min: Number(duration_min),
        user_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: error });
    return;
  }

  try {
    user = await prisma.user.update({
      data: {
        is_instructor: true,
      },
      where: { id: req.body.user_id },
    });
  } catch (error) {
    console.error(error);
    return;
  }

  res.json({ advert });
});

export { router };
