import express, { Request, Response } from 'express';
import { Advert } from '@prisma/client';
import { prisma } from '../../app';
import { authCheck } from '../../middlewares';
// import { authCheck } from '../../middlewares';

const router = express.Router();

router.get('/:advertId', async (req: Request, res: Response) => {
  let comments: object[];
  try {
    comments = await prisma.comment.findMany({
      where: {
        advert_id: req.params.advertId,
      },
      include: {
        user: {
          select: {
            username: true,
            photo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    res.status(500).json({ data: error });
    return;
  }
  res.json(comments);
});

router.post('/', authCheck, async (req: Request, res: Response) => {
  const { comment, stars, advert_id } = req.body;
  let newComment: any;
  try {
    newComment = await prisma.comment.create({
      data: {
        stars,
        comment,
        user_id: res.locals.user.id,
        advert_id,
      },
    });
    newComment = await prisma.comment.findUnique({
      where: { id: newComment.id },
      include: {
        user: {
          select: {
            username: true,
            photo: true,
          },
        },
      },
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
    return;
  }
  try {
    const rating = await prisma.comment.aggregate({
      where: {
        advert_id,
      },
      _avg: {
        stars: true,
      },
    });
    await prisma.advert.update({
      where: {
        id: advert_id,
      },
      data: {
        rating: rating._avg.stars ? rating._avg.stars : 0,
      },
    });
  } catch (e) {
    console.log(e);
    return;
  }
  res.json(newComment);
});

export { router };
