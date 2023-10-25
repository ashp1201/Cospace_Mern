import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminlogin.css';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Toaster,toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { adminValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { loginAdmin } from '../helper/helper';



function Adminadminlogin() {
    const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '', // Add the 'password' field to initialValues
    },
    validate:  adminValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      let adminloginPromise =loginAdmin({email:values.email,password:values.password});
      toast.promise(adminloginPromise,{
        loading:'Checking ....',
        success: <b>adminlogin Successfully..!</b>,
        error: <b>Incorrect Password...!</b>
      })
      console.log(values);
      adminloginPromise
      .then(res=> {
        let { token} =res.data;
        const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 24*60*60 * 1000);
document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
        // localStorage.setItem('token', token);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000); // 1000 milliseconds = 1 second
      })
      .catch((error)=>{
        console.log(error)
      })
     }
   })
    
  
  return (
    <div className='adminlogin'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      

      <form action='/home' className='adminlogin_container' onSubmit={formik.handleSubmit}>
        <div className='adminlogin_avatar'>
          <Avatar className='Avatar' sx={{ height: '85px', width: '85px' }} />
        </div>
        <div className='adminlogin_email'>
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
        <div className='adminlogin_password'>
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
        <div className='btn_adminlogin'>
          <label htmlFor='btn_adminlogin'></label>
          <Button type='submit' name='btn_adminlogin' className='btn' variant='contained' color='secondary'>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Adminadminlogin