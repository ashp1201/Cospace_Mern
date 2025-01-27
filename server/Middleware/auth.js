import jwt from 'jsonwebtoken';
//import ENV from '../config.js';
import dotenv from 'dotenv';

export default async function Auth(req,res,next){
    try {
        //acccess authorize headeer to validate request
        const token=req.headers.authorization.split(" ")[1];
        //this will give token only bearer is arr[0]



        //retrive the user detail to the logged in user 
        const decodedToken= await jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodedToken;
        // res.json(decodedToken);//retur userid email iat exp
        next();
//this  will give output as Bearer token..in Auth =>Bearer
//To Segregate token from this remove Bearer


    } catch (error) {
        return res.status(401).json({error:"Authenticate Failed",e:error.message})
    }
}


export function localVariables(req,res,next){
    res.app.locals = {
        //create variable when we generate Otp
        OTP:null,
        resetSession:false
    }
    next();
}