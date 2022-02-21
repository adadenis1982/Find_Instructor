import express, { Request, Response } from 'express';
import { Advert } from '@prisma/client';

import { prisma } from '../../app';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let uniqueAdvertsByCity: Advert[];

  try {
    uniqueAdvertsByCity = await prisma.advert.findMany({
      distinct: ['city'],
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }

  res.json({ uniqueAdvertsByCity });
});

export { router };
