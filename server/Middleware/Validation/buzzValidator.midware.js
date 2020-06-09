const {body, validationResult} = require('express-validator');

exports.buzzValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if(!result.isEmpty()){
    console.log(result);
   return res.status(422).json(result);
  }
  next();
}

exports.buzzValidator = [
  body('description')
        .trim()
        .notEmpty()
        .withMessage('Please add some Buzz Description'),
  body('category')
        .trim()
        .notEmpty()
        .withMessage('Please add some Buzz Description'),
];