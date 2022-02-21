import express, { Request, Response } from 'express';
import { User } from '@prisma/client';
import { prisma } from '../../app';
import { upload } from '../../middlewares';

const router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  let user: User | null;
  let userAdverts: object;

  // ИНФА ПО ЮЗЕРУ + ЕГО ОБЪЯВЛЕНИЯ + ВСЕ КОММЕНТЫ, НАПИСАННЫЕ ЭТИМ ЮЗЕРОМ
  try {
    user = await prisma.user.findUnique({
      where: { id },
      // include: { comments: true },
      include: {
        adverts: {
          include: {
            bookings: {
              include: {
                user: {
                  select: {
                    username: true,
                    photo: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    res.json({ error });
    return;
  }

  // ПОЛУЧИТЬ ВСЕ КОММЕНТЫ НА ВСЕ ОБЪЯЫЛЕНИЯ ЮЗЕРА
  try {
    userAdverts = await prisma.advert.findMany({
      where: { user_id: id },
      include: { comments: true },
    });
  } catch (error) {
    res.json({ error });
    return;
  }

  res.json({ user, userAdverts });
});

router.put(
  '/:id',
  upload.single('avatar'),
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, about } = req.body;

    let updatedUser: User;
    try {
      updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username,
          // photo: req.file?.path.replace('public/', 'http://localhost:5000/'),
          photo: `http://localhost:5000/img/${req.file?.filename}`,
          about,
        },
      });
    } catch (error) {
      console.error(error);
      res.json({ error });
      return;
    }

    res.json(updatedUser);
  },
);

export { router };
