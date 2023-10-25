// locationRouter.js
import { Router } from "express";
import * as controller from '../Controller/locationController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const locationRouter = Router();



const storage=multer.diskStorage({
    destination : function(req,file,cb) {
        if(!fs.existsSync('uploads')){
    //it will execute when public folder does not exists
    fs.mkdirSync('uploads');//make public folder

        }

        if (!fs.existsSync('uploads/files')){
            //it will execute when files not exist in public folder.
            fs.mkdirSync('uploads/files');
        }

        cb(null,'uploads/files/');
    //return error as null with its path

    },
    filename:function(req,file,cb){
        console.log(file)
        cb(null,Date.now() + file.originalname);

    }
})


const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        const ext=path.extname(file.originalname);
        //ext contain extensiom
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
            return cb(new Error('Only image files are allowed'));
          } 
        cb(null,true);
    }
})


locationRouter.route('/addlocation').post(upload.single('photo'),(req, res, next) => {
    // Middleware to log file upload information
    if (req.file) {
      // If a file was uploaded, log its details
      console.log('Uploaded File Details:');
      console.log('Fieldname:', req.file.fieldname);
      console.log('Originalname:', req.file.originalname);
      console.log('Mimetype:', req.file.mimetype);
      console.log('Size:', req.file.size);
      console.log('Destination:', req.file.destination);
      console.log('Filename:', req.file.filename);
    } else {
      // No file was uploaded
      console.log('No file was uploaded.');
      console.log(error.message);
    }
  
    // Continue to the addLocation controller
    next();
  },
controller.addLocation
);

locationRouter.get('/getlocation', controller.getLocationsByUserType);
export default locationRouter;
