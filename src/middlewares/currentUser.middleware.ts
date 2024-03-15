import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors'
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  console.log('Upsy:', req.session);
  if (!req.session || !req.session.user) {
    throw new BadRequestError('Session expired or not founded, please login again');
  }
  next()
}
