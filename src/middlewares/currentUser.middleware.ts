import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors'
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.user) {
    throw new BadRequestError('session expired or not founded, please login again');
  }
  next()
}
