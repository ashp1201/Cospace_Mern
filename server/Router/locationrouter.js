import { Router } from 'express';
import * as controller from '../Controller/locationController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../cloudinary.js'; // Import Cloudinary config

const locationRouter = Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'locations', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
  },
});

// Multer setup
const upload = multer({ storage });

// Route for adding locations with photo upload
locationRouter
  .route('/addlocation')
  .post(
    upload.single('photo'),
    (req, res, next) => {
      if (req.file) {
        // console.log('Uploaded File Details:', req.file);
      } else {
        console.log('No file was uploaded.');
      }
      next();
    },
    controller.addLocation
  );

// Route for getting locations by user type
locationRouter.get('/getlocation', controller.getLocationsByUserType);

// Route for deleting a location
locationRouter.delete('/deletelocation/:id', controller.deleteLocation);


locationRouter.put('/updatelocation/:id', controller.updateLocation);  // PUT route for updating the location

export default locationRouter;
