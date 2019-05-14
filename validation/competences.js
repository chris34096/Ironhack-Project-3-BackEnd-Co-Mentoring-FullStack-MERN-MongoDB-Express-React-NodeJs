const Validator = require('validator');
const isEmpty = require('./isEmp');

module.exports = function validateCompetenceInput(data) {
  let errors = {};
  data.skill1 = !isEmpty(data.skill1) ? data.skill1 : '';
  data.skill2 = !isEmpty(data.skill2) ? data.skill2 : '';
  data.skill1Level = !isEmpty(data.skill1Level) ? data.skill1Level : '';
  data.skill2Level = !isEmpty(data.skill2Level) ? data.skill2Level : '';
  
  if (Validator.isEmpty(data.skill1) !== Validator.isEmpty(data.skill1Level)){
    errors.skill1 = "Please provide your skill and level"
  }
  if(Validator.isEmpty(data.skill2) !== Validator.isEmpty(data.skill2Level)){
    errors.skill2 = "Please provide your skill and level"
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
