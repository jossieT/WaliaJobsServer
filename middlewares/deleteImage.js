const fs = require('fs');

const deleteImage = (imagename) =>{
    // const DIR = 'uploads/images';
      console.log('file received');
      console.log(imagename);
      try {
          fs.unlinkSync(imagename);
          console.log('successfully deleted Image');

        } catch (err) {
          // handle the error
          console.log('Error occured: '+ err.message);
        }   
  }
  module.exports = deleteImage;