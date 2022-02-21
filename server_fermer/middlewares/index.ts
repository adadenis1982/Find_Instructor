import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

interface User {
  id: string;
  email: string;
  username: string;
}

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.isAuthorized) {
    return res.status(401).json({ message: 'you gotta registrate, mf' });
  }

  return next();
};

const sessionMiddle = (req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.session?.user;
  res.locals.id = req.session?.user?.id;
  res.locals.email = req.session?.user?.email;
  res.locals.username = req.session?.user?.username;
  res.locals.isAuthorized = Boolean(req.session.user);
  next();
};

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, 'public/img');
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

export { authCheck, sessionMiddle, upload };
