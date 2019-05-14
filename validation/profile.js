const Validator = require('validator');
const isEmpty = require('./isEmp');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
  data.companyCity = !isEmpty(data.companyCity) ? data.companyCity : '';
  data.skill1 = !isEmpty(data.skill1) ? data.skill1 : '';
  data.skill2 = !isEmpty(data.skill2) ? data.skill2 : '';
  data.levels = !isEmpty(data.password2) ? data.password2 : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  
  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required';
  }
  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last name must be between 2 and 30 characters';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required';
  }
 

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
