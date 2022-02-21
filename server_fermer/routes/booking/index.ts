import express, { Request, Response } from 'express';
import { Booking } from '@prisma/client';
import { prisma } from '../../app';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { user_id, advert_id, date } = req.body;

  let booking: Booking;

  try {
    booking = await prisma.booking.create({
      data: {
        user_id,
        advert_id,
        date,
      },
    });
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  res.json({ booking });
});

router.get('/:user_id', async (req: Request, res: Response) => {
  let bookings: object[];
  try {
    bookings = await prisma.booking.findMany({
      where: {
        user_id: req.body.user_id,
      },
      include: {
        user: {
          select: {
            username: true,
            photo: true,
          },
        },
        advert: {
          select: {
            title: true,
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
  res.json(bookings);
});

router.put('/', async (req: Request, res: Response) => {
  const { action, bookingId } = req.body;

  let response: Booking;
  try {
    response = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        is_confirmed: action,
      },
    });
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  res.json(response);
});

export { router };
