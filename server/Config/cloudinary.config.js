const cloudinary = require('cloudinary');
const keys = require('./keys.config');

cloudinary.config({
  cloud_name: keys.CLOUD_NAME,
  api_key: keys.CLOUD_API_KEY,
  api_secret: keys.CLOUD_API_SECRET
});
