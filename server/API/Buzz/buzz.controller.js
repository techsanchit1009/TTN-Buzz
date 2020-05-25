const buzzService = require('./buzz.service');
const cloudinary = require('cloudinary');

exports.addBuzz = async (req, res) => { 
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
    const buzz = await buzzService.addBuzz(newBuzz);
    res.send(buzz);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.getAllBuzz = async (req, res) => {
  try {
    const allBuzz = await buzzService.getAllBuzz();
    res.send(allBuzz);
  } catch(err) {
    res.status(400).send(err);
  }
};