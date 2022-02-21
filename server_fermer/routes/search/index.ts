import express, { Request, Response } from 'express';
import { Advert } from '@prisma/client';
import { prisma } from '../../app';
// import { authCheck } from '../../middlewares';

const router = express.Router();

router.get('/result', async (req: Request, res: Response) => {
  // city sportType orderBy page sortType
  let tempAdverts: Advert[];
  let adverts: Advert[];
  try {
    // let page: number = Number(req.query.page) < 1 ? 1 : Number(req.query.page);
    // if (Number.isNaN(Number(req.query.page))) {
    //   page = 1;
    // }
    if (req.query.city) console.log(decodeURI(req.query.city.toString()));
    // const skip: number = (page - 1) * 15;
    // const take: number = page * 15;
    let sortType: string = 'desc';
    if (req.query.sorttype === 'По возростанию') {
      sortType = 'asc';
    } else {
      sortType = 'desc';
    }

    let orderBy: object = {};

    switch (req.query.orderBy) {
      case 'По рейтингу': {
        orderBy = {
          rating: sortType,
        };
        break;
      }
      case 'По дате': {
        orderBy = {
          createdAt: sortType,
        };
        break;
      }
      case 'По комментариям': {
        orderBy = {
          comments: sortType,
        };
        break;
      }
      case 'По цене': {
        orderBy = {
          price: sortType,
        };
        break;
      }
      default: {
        orderBy = {
          createdAt: sortType,
        };
        break;
      }
    }

    if (req.query.city && req.query.sportType) {
      // возможно необходимо прямое сравнение с undefined
      adverts = await prisma.advert.findMany({
        // skip,
        // take,
        where: {
          sport_type: decodeURI(req.query.sportType.toString()),
          city: decodeURI(req.query.city.toString()),
        },
        include: {
          user: {
            select: {
              username: true,
              photo: true,
              token: true,
            },
          },
        },
        orderBy,
      });

      // понять общее количество
      // tempAdverts = await prisma.advert.findMany({
      //   where: {
      //     sport_type: decodeURI(req.query.sportType.toString()),
      //     city: decodeURI(req.query.city.toString()),
      //   },
      // });
    }
    if (req.query.city) {
      adverts = await prisma.advert.findMany({
        // skip,
        // take,
        where: {
          city: decodeURI(req.query.city.toString()),
        },
        include: {
          user: {
            select: {
              username: true,
              photo: true,
              token: true,
            },
          },
        },
        orderBy,
      });

      // понять общее количество
      // tempAdverts = await prisma.advert.findMany({
      //   where: {
      //     city: decodeURI(req.query.city.toString()),
      //   },
      // });
    } else if (req.query.sportType) {
      adverts = await prisma.advert.findMany({
        // skip,
        // take,
        where: {
          sport_type: decodeURI(req.query.sportType.toString()),
        },
        include: {
          user: {
            select: {
              username: true,
              photo: true,
              token: true,
            },
          },
        },
        orderBy,
      });

      // понять общее количество
      // tempAdverts = await prisma.advert.findMany({
      //   where: {
      //     sport_type: decodeURI(req.query.sportType.toString()),
      //   },
      // });
    } else {
      adverts = await prisma.advert.findMany({
        // take,
        // skip,
        include: {
          user: {
            select: {
              username: true,
              photo: true,
              token: true,
            },
          },
        },
        orderBy,
      });
    }

    // понять общее количество
    tempAdverts = await prisma.advert.findMany();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
    return;
  }

  res.json({ adverts, totalLength: tempAdverts.length });
});

export { router };
