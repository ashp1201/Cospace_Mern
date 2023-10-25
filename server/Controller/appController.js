import UserModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; 
import ENV from '../config.js';
import otpGenerator from 'otp-generator';
import rolesModel from "../Model/roles.model.js";


/**MiddleWare for verify User */
export async function verifyUser(req,res,next){
  try {
    let {email} = req.method == "GET" ? req.query : req.body;

    let exist =await UserModel.findOne({email});
    if(!exist) return res.status(404).send({error :"Can't find User!"});
    next();
    
  } catch (error) {
    console.log(`error:${error.message}`)
    return res.status(404).send({error:"Authentication Error"})
  }
}


/**POST : http://loaclhost:8000/api/register 
/* @param :{
    "fullName":"ashok purohit",
    "email":"ash123@gmail.com",
    "gender":"male",
    "password":"ash123@"
}
*/
export async function register(req, res) {
  try {
    const { fullName, email, password, gender } = req.body;
    const roles=req.body.roles || ['User'];
    console.log(roles)
    if (roles.includes('Admin')){
      
    var permissions =['view_location','view_price','view_detail','add_location']
    }
    else{
      var permissions =['view_location','view_price','view_detail'];
    }
    console.log(permissions)
  
    //check the existing user

    //UserModel.findOne({ email }
    // this will search email we provide that present in database or not
    //if present then reject
    const existEmail = UserModel.findOne({ email })
  .then((user) => {
    if (user) {
      throw new Error("Provide use other email");
    }
  })
  .catch((err) => {
    //databsae wrong query then it will execute
    throw new Error(err);
  });


    Promise.all([existEmail]) //this will call fuction exist Email
      .then(() => {
        if (password) {
          bcrypt.hash(password,10)//data and salt 
            .then((hashedPassword) => {
              const user = new UserModel({
                fullName,
                email,
                gender,
                password: hashedPassword,
                roles,
                permissions,
              });

              //return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Register Sucessfully" ,roles:user.roles, permissions:user.permissions})
                )
                .catch((error) => res.status(500).send({ error:error.message}));
            })
            .catch((error) => {
              return res.status(500).send({
                error: error.message,
              });
            });
        }
      })
      .catch((error) => {
        console.log("use different Email")
        return res.status(502).send({ error: "user Exist ...!"});
      });
  } catch (error) {e:
    return res.status(501).send(Error);
  }
}

/**POST : http://loaclhost:8000/api/login 
/* @param :{
    "email":"ash123@gmail.com",
    "password":"ash123@"
}
*/
export async function login(req, res) {
  const {email,password} =req.body;

  try{
      UserModel.findOne({ email })
      .then(user=>{
        bcrypt.compare(password, user.password)
        .then(passwordCheck=>{
          //for check empty password field
          if(!passwordCheck) return res.status(400).send({
            error:"Don't have Password"
          })

          //create jwt token
          //user can create token and authenticate user
          const token=jwt.sign({
                      userId:user._id,
                      email:user.email
                    },ENV.JWT_SECRET,{expiresIn : "24h"});

          return res.status(200).send({msg:"Login Successful..!",email:user.email,token,roles:user.roles,permissions:user.permissions})

        })
        .catch(error=>{
          return res.status(400).send({ error :"Password does not match",
        p:user.password,
      pe:password,e:error.message})
        })
      })
      .catch( error =>{
        return res.status(404).send({ error :"User Email not Found",e:error.message})
      })

  }catch(error){
    return res.status(500).send({error});
  }
}

/**Get : http://loaclhost:8000/api/user/ash123@gmail.com */
export async function getUser(req, res) {
  const { email }= req.params;

  try {
    if(!email) return res.status(501).send({error:"Invalid Email"});
    UserModel.findOne({email})
    .then((user)=>{
       
        if(!user) return res.status(501).send({error :"Couldn't Find the User"})

        //don't want password field to get
        const {password,...rest} = Object.assign({},user.toJSON());
        return res.status(201).send(rest)
    })
    .catch((err)=>{
        throw new Error({error:err})
    })
    
  } catch (error) {
    return res.status(404).send({error:"Cannot Find User Data",e:error.message})
  }
}

/**Put : http://loaclhost:8000/api/updateuser
 *@param: {
    "id":"<userid>"
}
body:{
    firstName:'',
    address:'',
    profile:''
}
 */

export async function updateUser(req, res) {
  try {
    const {userId} = req.user;
    if (userId) {
      const body = req.body;

      // Update the data
      UserModel.updateOne({ _id: userId }, body)
        .then((data) => {
          // Check if the update was successful
          if (data.nModified === 0) {
            return res.status(404).send({ error: "User not found" });
          }
          return res.status(201).send({ msg: "Record Updated....!" });
        })
        .catch((err) => {
          // Handle any errors that occur during the update
          return res.status(500).send({ error: "Internal Server Error" });
        });
    } else {
      return res.status(400).send({ error: "Invalid request. User ID is missing" });
    }
  } catch (error) {
    // Handle any exceptions that occur
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

/**Get : http://loaclhost:8000/api/generateOTP*/
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
  res.status(201).send({code:req.app.locals.OTP})
}

/**Get : http://loaclhost:8000/api/verifyOTP*/
export async function verifyOTP(req, res) {
  const { code } =req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
    req.app.locals.OTP=null;//reset the OTP value
    req.app.locals.resetSession=true;//start session for reset password
    return res.status(201).send({msg:'Verify Sucessfully!'})
  }
  return res.status (400).send({error:"Invalid OTP"})
}

//successfully redirect user when OTP is valid
/**Get : http://loaclhost:8000/api/createResetSession */
export async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
    req.app.locals.resetSession=false;
    //allow acess to the route only onces
    return res.status(201).send({flag:req.app.locals.resetSession})
  }
  return res.status(440).send({error:"Session Expired ! "})
}

//update the password when we have valid session
/**PUT : http://loaclhost:8000/api/resetPassword */
export async function resetPassword(req, res) {
  try{
    //if otp is not verified it will not reset Password
    if (!res.app.locals.resetSession) return res.status(440).send({error:"Session expired"})

    const { email,password} =req.body;

    try{
      UserModel.findOne({email})
      .then(user=>{
        bcrypt.hash(password,10)
          .then(hashedPassword=>{
            UserModel.updateOne({email:user.email},{password:hashedPassword})
            .then((data)=>{
                  return res.status(201).send({msg:"record Updated..!"})
            })
            .catch(e=>{
              throw new Error({err:e})
            })
          })
          .catch(e=>{
            return res.status(500).send({
              error:"Enable to hashed password"
            })
          })
      })
      .catch(error=>{
        console.log(error.message,"1")
        return res.status(404).send({error:"Username not found"})
      })
    }
    catch(error){
      console.log(error.message,"1")
          return res.status(404).send({error:error.message});
  }
}

  catch(error){
    console.log(error.message,"1")
    return res.status(404).send({error:error.message});
  }}
