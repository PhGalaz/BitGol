import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors';
import { body } from 'express-validator';
import BaseValidator from './_base.validator';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

class UsersValidator extends BaseValidator {
    public userFields: any[] = [
        body('name').notEmpty().withMessage('Name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').notEmpty().isEmail().withMessage('Email is required'),
        body('email').notEmpty().isEmail().withMessage('Email format is not valid'),
        body('password').notEmpty().withMessage('Password is required'),
        body('password')
          .notEmpty()
          .isStrongPassword()
          .withMessage(
            'Password format invalid. Must have at least 8 characters, one upper letter and one special character'
          ),
        // body('phone').optional().notEmpty().withMessage('Phone field is empty'),
        // body('maternal_name')
        //   .optional()
        //   .notEmpty()
        //   .withMessage('Maternal name field is empty')
    ];

    public validateConfirmUser = [
      body('userId').notEmpty().withMessage('userId is mandatory').isString(),
      body('token').notEmpty().withMessage('token is mandatory').isString()
    ];
    
    // Validate fields for login method
    public login: any[] = [
      body('email').notEmpty().isEmail().withMessage('Email is required'),
      body('email').notEmpty().isEmail().withMessage('Email format is not valid'),
      body('password').notEmpty().withMessage('Password is required')
    ];

    // Validate if email exists in db
    public validateIfEmailExists = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const { email } = req.body;
      const user = await UserModel.findOne({ email: email });
      if (user) {
        throw new BadRequestError(`${email} already registered`);
      }
      next();
    };

     // Validate if email and password for login are correct
		public validateCredentials = async (
			req: Request,
			res: Response,
			next: NextFunction
		) => {
			const { email, password } = req.body;
			const user = await UserModel.findOne({ email: email });
			if (!user) throw new BadRequestError('Email not registered');
			if (user.status_id === 1) throw new BadRequestError('Your account is not verified, please check your email and click the link in the message to complete the verification of your account. Have you not received the email?');
			if (user.status_id === 3) throw new BadRequestError('Your account has been deactivated, please contact us at');
			if (user.status_id === 4) throw new BadRequestError('Your account has been suspended, please contact us at');
			// if (user.status_id !== 2) throw new BadRequestError('Bad credentials');
			const comparedPassword = await bcrypt.compare(password, user.password);
			if (!comparedPassword) {
				throw new BadRequestError('Bad credentials');
			}
			next();
		};
}

export default UsersValidator;
    