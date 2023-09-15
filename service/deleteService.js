const cloudinary = require("cloudinary").v2;
const AysncHandler = require("express-async-handler");

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
});

const deleteImage = AysncHandler (async (secureUrl) => {
  try {
    //Extracting public ID using secure_url
    const publicId = cloudinary.url(secureUrl, { secure: true }).split('/').pop().split('.')[0];
    // Delete the image associated with the content or user
    const deleteResult = await cloudinary.uploader.destroy(publicId);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting profile and associated image:', error);
  }
});

module.exports = {
  deleteImage
}
