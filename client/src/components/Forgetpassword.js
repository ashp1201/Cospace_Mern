import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Forgetpassword.css';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import  {toast ,Toaster} from 'react-hot-toast';
import {emailValidate} from '../helper/validate';



function Forgetpassword() {
 
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate:  emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try{
      // navigate(`/recoverotp?email=${values.email}`);
      return navigate('/forgetpassword/recoverOTP',{state:{email:values.email}})
      }
      catch(e){
        toast.error("Invalid User")

      }
    }
  })
  return (
    <div className='forgetpass'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form action='/home'  className="forgetpass_container"  onSubmit={formik.handleSubmit}>
        <div className="forgetpass_avatar">
        <Avatar className='Avatar' sx={{height:'85px',width:'85px'}}/>
        </div>
        <div className='text_for' >
          <Typography variant='h5'>Forget Password</Typography>
        <Typography className='p' variant='p' >Please enter the email address you'd like your password reset infromation sent to</Typography>
        </div> 
        <div className="forgetpass_email">
          <label htmlFor="email"></label>
        <TextField 
         {...formik.getFieldProps('email')}
          name='email' sx={{width:'280px'}} color='secondary' variant="standard" type='email' label="Email" required/>
        </div>
        <div className="btn_forgetpass">
        <label htmlFor="btn_forgetpass"></label>
        <Button   type='submit' className='btn' variant="contained" color='secondary'>Request Reset Link</Button>
        </div>
        
        <Link to='/login'>
        <div className="backtologin">
            <Button >Back to Login</Button>
        </div>
        </Link>
      </form>
    </div>
  )
}

export default Forgetpassword