import {Router} from "express";
const router = Router();
//initialize with router variable


//import all controller 
import * as controller from '../Controller/appController.js';
import { registerMail } from "../Controller/mailer.js";
import Auth,{localVariables}  from '../Middleware/auth.js'

/* Post Method *///values are not visible in url
//this operation will create new operation in database
router.route('/register').post(controller.register)
//register user
router.route('/registerMail').post(registerMail); //send the email
router.route('/authenticate').post(controller.verifyUser,(req,res)=> res.end()); //authenticate user
router.route('/login').post(controller.verifyUser,controller.login); //login in app

/* Get Method */ //values are visible in url
//used when we want to check record in database
router.route('/user/:email').get(controller.getUser) //user with email
router.route('/generateOTP').get(controller.generateOTP) //generate random OTP
router.route('/verifyOTP').get(controller.verifyUser,controller.verifyOTP) // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession) // reset all the variable





/* PUT Method */
////This operation will change contain from database
router.route('/updateuser').put(Auth,controller.updateUser);// is use to upadte the user profile
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword) // use to reset password 


export default router;