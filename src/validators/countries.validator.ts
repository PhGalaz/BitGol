import { param } from 'express-validator';
import BaseValidator from './_base.validator';

class CountriesValidator extends BaseValidator {
  // Validate id param
  public paramIdValidator = [
    param('id').notEmpty().isNumeric().withMessage('Id must be a integer')
  ];
}

export default CountriesValidator;
