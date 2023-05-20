import { body } from 'express-validator';
import BaseValidator from './_base.validator';

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
}

export default UsersValidator;
    