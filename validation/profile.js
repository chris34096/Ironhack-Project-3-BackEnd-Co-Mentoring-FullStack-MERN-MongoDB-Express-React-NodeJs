const Validator = require('validator');
const isEmpty = require('./isEmp');

module.exports = function validateProfileInput(data) {
  console.log(data)
  let errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
  data.companyCity = !isEmpty(data.companyCity) ? data.companyCity : '';
  data.skill1 = !isEmpty(data.skill1) ? data.skill1 : '';
  data.skill2 = !isEmpty(data.skill2) ? data.skill2 : '';
  data.skill1Level = !isEmpty(data.skill1Level) ? data.skill1Level : '';
  data.skill2Level = !isEmpty(data.skill2Level) ? data.skill2Level : '';

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
  if (Validator.isEmpty(data.companyCity)) {
    errors.companyCity = 'Living city field is required';
  }
  if (Validator.isEmpty(data.skill1) || Validator.isEmpty(data.skill1Level)) {
    errors.skill1 = 'Please provide your skill and level';
  }
  if (Validator.isEmpty(data.skill2) || Validator.isEmpty(data.skill2Level)) {
    errors.skill2 = 'Please provide your skill and level';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
