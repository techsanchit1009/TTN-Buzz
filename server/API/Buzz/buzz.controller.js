const buzzService = require('./buzz.service');
const cloudinary = require('cloudinary');
const validator = require('../../Libs/validator.lib');

exports.addBuzz = async (req, res) => { 
  const userEmail = req.body.email;
  let newBuzz = {
    description: req.body.description,
    category: req.body.category,
  };
  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    newBuzz = {
      ...newBuzz,
      image: result.secure_url
    }
  }

  try {
    const errors = validator(req.body, 'buzz');
    console.log(errors);
    if(errors.length){
      return res.status(422).send(errors); // sending errorArray if validation failed
    }
    const buzz = await buzzService.addBuzz(newBuzz, userEmail);
    res.status(200).send(buzz);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.likeDislikeBuzz = async (req, res) => {
  try {
    const {action, buzzId} = req.params;
    const userEmail = req.body.email;
    await buzzService.likeDislikeBuzz(action, buzzId, userEmail);
    const updatedBuzzList = await buzzService.getAllBuzz();
    res.status(200).send(updatedBuzzList);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.getAllBuzz = async (req, res) => {
  try {
    const allBuzz = await buzzService.getAllBuzz();
    res.status(200).send(allBuzz);
  } catch(err) {
    res.status(400).send(err);
  }
};