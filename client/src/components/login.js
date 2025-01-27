import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Toaster,toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { userValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { loginUser } from '../helper/helper';


function Login() {
  
  const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '', // Add the 'password' field to initialValues
    },
    validate:  userValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      let loginPromise =loginUser({email:values.email,password:values.password});
      toast.promise(loginPromise,{
        loading:'Checking ....',
        success: <b>Login Successfully..!</b>,
        error: <b>Incorrect Password...!</b>
      })
      console.log(values);
      loginPromise
      .then(res=> {
        let { token} =res.data;
        const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 24*60*60 * 1000);
document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        // localStorage.setItem('token', token);
        setTimeout(() => {
          navigate('/');
        }, 1000); // 1000 milliseconds = 1 second
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  })
  

  return (
    <div className='login'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      

      <form action='/home' className='login_container' onSubmit={formik.handleSubmit}>
        <div className='login_avatar'>
          <Avatar className='Avatar' sx={{ height: '85px', width: '85px' }} />
        </div>
        <div className='login_email'>
          <label htmlFor='email'></label>
          <TextField
            {...formik.getFieldProps('email')}
            name='email'
            sx={{ width: '230px' }}
            color='secondary'
            variant='standard'
            type='email'
            label='Email'
           
          />
        </div>
        <div className='login_password'>
          <label htmlFor='password'></label>
          <TextField
            {...formik.getFieldProps('password')}
            name='password'
            sx={{ width: '230px' }}
            color='secondary'
            variant='standard'
            type='password'
            label='Password'
           
          />
        </div>
        <div className='btn_login'>
          <label htmlFor='btn_login'></label>
          <Button type='submit' name='btn_login' className='btn' variant='contained' color='secondary'>
            Login
          </Button>
        </div>
        <div className='orr'>
          <p className='or'>OR</p>
          <hr className='hr' />
        </div>

        <div className='btn_icon'>
          <Button className='btn_google' startIcon={<GoogleIcon color='white' />} variant='contained'>
            Login with Google
          </Button>
        </div>

        <div className='forget_passwordsignup'>
          <a href='/forgetpassword'>Forget Password?</a>
          <span>
            Don't have an account? <a href='/register'> Sign up</a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
