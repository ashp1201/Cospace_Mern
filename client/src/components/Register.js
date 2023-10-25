import React, { useEffect } from "react";
import { useState } from "react";
import "./register.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from 'formik';
import { registerValidate } from "../helper/validate";
import {Toaster,toast } from 'react-hot-toast';
import {useAuthStore} from '../store/store';
import  { registerUser } from '../helper/helper';
import { EmailContext } from '../hooks/EmailContext';

/* flow
=>pass value to helper function
*/
function Register() {
const navigate = useNavigate();
// const setEmail=useAuthStore(state=>state.setEmail)
// const {email} =useAuthStore(state=>state.auth)
const { email, setEmail } = useState('');

useEffect(()=>{
console.log(email)
})

  const formik = useFormik({
    initialValues: {
      username:'',
      email: '',
      password: '',
      c_password:'',
      gender: document.getElementsByName('gender').value,
      // Add the 'password' field to initialValues
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // values=await Object.assign(values,{profile:file || ''})
      // setEmail(values.email)
      
      console.log(values);
      let registerPromise =registerUser(values);
      toast.promise(registerPromise,{
        loading:'Creating ....',
        success: <b>Register Successfully..!</b>,
        error: <b>Could not Register...!</b>
      })
      registerPromise
      .then(res=> {
        setTimeout(() => {
          navigate('/login');
        }, 1000); // 1000 milliseconds = 1 second
      })
      .catch((error)=>{
        console.log(error)
      })
    },
  });

  return (
    <div class="register">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <form className="register_container" onSubmit={formik.handleSubmit}>
        <div className="register_avatar">
          <Avatar className="Avatar" sx={{ height: "85px", width: "85px" }} />
        </div>
        <div className="register_username">
          <label htmlFor="username"></label>
          <TextField 
          {...formik.getFieldProps('username')}
            name="username"
            sx={{ width: "230px" }}
            color="secondary"
            variant="standard"
            type="text"
            label="Full Name"
            
          />
        </div>
        <div className="register_email">
          <label htmlFor="email"></label>
          <TextField 
          {...formik.getFieldProps('email')}
            name="email"
            sx={{ width: "230px" }}
            color="secondary"
            variant="standard"
            type="email"
            label="Email"
            
          />
        </div>
        <div className="register_gender">
          <FormLabel className='label_g' for="gender">Male</FormLabel>
          <input {...formik.getFieldProps('gender')} 
          defaultChecked type="radio" 
          name="gender" value="male" />
          <FormLabel name="gender">Female</FormLabel>
          <input {...formik.getFieldProps('gender')} className='label_g' 
            type="radio"
            id="gender"
            name="gender"
            value="female"
          />
           <FormLabel name="gender">Other</FormLabel>
          <input {...formik.getFieldProps('gender')} className='label_g' 
            type="radio"
            id="gender"
            name="gender"
            value="other"
          />
        </div>

        <div className="register_password">
          <label htmlFor="pass"></label>
          <TextField
            {...formik.getFieldProps('password')}
            name="password"
            id="pass"
            sx={{ width: "230px" }}
            color="secondary"
            variant="standard"
            type="password"
            label="Password"
            
          />
        </div>
        <div className="register_password">
          <label htmlFor="c_pass"></label>
          <TextField
          {...formik.getFieldProps('c_password')}
            name="c_password"
            id="con_pass"
            sx={{ width: "230px" }}
            color="secondary"
            variant="standard"
            type="password"
            label="Confirm Password"
            
          />
        </div>


        <div className="btn_register">
          <Button
            type="submit"
            className="btn"
            variant="contained"
            color="secondary"
          >
            Sign Up
          </Button>
        </div>

        <p className="or">OR</p>
        <hr className="hr" />

        <div className="btn_icon">
          <Link to="/home">
            <Button
              className="btn_google"
              startIcon={<GoogleIcon color="white" />}
              variant="contained"
            >
              register with Google
            </Button>
          </Link>
        </div>
        <div className="forget_passwordsignup">
          <span>
            Already a user? <a href="/login">LOGIN</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
