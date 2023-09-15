const AysncHandler = require("express-async-handler");
const { uploadToCloudinary } = require("../service/uploadService");
const { bufferToDataURI } = require('../utils/file');
const cloudinary = require('cloudinary').v2;

const uploadImage = AysncHandler (async (req, res, next) => {

    try {
        const { file } = req
        if (file){
    
        const fileFormat = file.mimetype.split('/')[1]
        const { base64 } = bufferToDataURI(fileFormat, file.buffer)
    
        imageDetails = await uploadToCloudinary(base64, fileFormat)
        req.imageData = imageDetails;
        console.log("Image Uploaded Sucessfully");
        next();
        }else{
          next();
        }
      } catch (error) {
        throw new Error("Error uploading Image: " + error.message);
      }
    });

module.exports = {
  uploadImage,
}
