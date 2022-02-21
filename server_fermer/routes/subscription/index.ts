import express, { Request, Response } from 'express';
import mailer from '../../middlewares/mailer';
import { createSubscriptionEmail } from '../../middlewares/mailCreator';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email } = req.body;

  const message = {
    to: `${email}`,
    subject: 'Подписка на обновления',
    html: createSubscriptionEmail(),
  };

  try {
    mailer(message);
  } catch (error) {
    res.json(error);
  }

  res.sendStatus(200);
});

export { router };
