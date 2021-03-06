const buzzService = require('./buzz.service');
const cloudinary = require('cloudinary');
const validator = require('../../Libs/validator.lib');

exports.addBuzz = async (req, res) => { 
  let newBuzz = {
    description: req.body.description,
    category: req.body.category,
    createdBy: req.user._id
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
    if(errors.length){
      return res.status(422).send(errors); // sending errorArray if validation failed
    }
    const buzz = await buzzService.addBuzz(newBuzz);
    res.status(201).send(buzz);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.likeDislikeBuzz = async (req, res) => {
  try {
    const {action, buzzId} = req.params;
    const user = req.user;
    await buzzService.likeDislikeBuzz(action, buzzId, user);
    const updatedBuzzList = await buzzService.getAllBuzz();
    res.status(201).send(updatedBuzzList);
  } catch(err) {
    res.status(400).send(err);
  }
}

exports.getAllBuzz = async (req, res) => {
  try {
    const page = req.query.page;
    const {allBuzz, totalBuzzCount} = await buzzService.getAllBuzz(page);
    res.status(200).send({buzzs: allBuzz, totalBuzzCount});
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.deleteBuzz = async (req, res) => {
  try {
    const { buzzId } = req.params;
    await buzzService.deleteBuzz(buzzId);
    res.status(200).send({message: 'Buzz Deleted Successfully!'});
  } catch(err) {
    res.status(400).send({message: 'Some Error occurred!'});
  }
}