import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './ChangePassword.css';
import {toast,Toaster} from 'react-hot-toast'
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import {  passwordValide } from '../helper/validate';

import {resetPassword} from '../helper/helper'
import {useAuthStore} from '../store/store';
import useFetch from '../hooks/fetch.hook';
import { useEmail } from '../hooks/EmailContext';
import { useLocation } from 'react-router-dom';


function ChangePassword() {
  const location =useLocation();
  const navigate=useNavigate();
  
    const formik = useFormik({
        initialValues: {
          password: '',
          c_password: '', // Add the 'password' field to initialValues
        },
        validate:  passwordValide,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            let resetPromise=resetPassword({email:location.state.email,password:values.password})

            toast.promise(resetPromise,{
              loading:'Updating ...',
              success: <b>Reset Successfull</b>,
              error: <b>Couldn't Change ,Error..!</b>
            });
            resetPromise.then(function(){
              setTimeout(() => {
                navigate('/login')
              }, 1000)
            })

        }
      })

      // if(isLoading) return <h1 >isLoading</h1>;
      // if(serverError) return <h1>{serverError.message}</h1>
      // if(status && status !== 201){
      //   return <Navigate to={'/password'} replace={true}></Navigate>
      // }
  
  return (
    <div className='chgpass'>
      <Toaster position='top-center' top-reverseOrder={false}></Toaster>
      <form action='/home' onSubmit={formik.handleSubmit} className="chgpass_container">
        <div className="chgpass_avatar">
        <Avatar className='Avatar' sx={{height:'85px',width:'85px'}}/>
        </div>
        <div className='text_for' >
          <Typography variant='h5'>Change password</Typography>
        <Typography className='p' variant='p' >Enter Password and confirm password </Typography>
        </div> 
        <div className="chgpass_password">
          <label htmlFor="password"></label>
          <TextField
            {...formik.getFieldProps('password')}
            name="password"
            id="pass"
            sx={{ width: "280px" }}
            color="secondary"
            variant="standard"
            type="password"
            label="Password"
            
          />
        </div>
        <div className="chgpass_password">
          <label htmlFor="c_password"></label>
          <TextField
          {...formik.getFieldProps('c_password')}
            name="c_password"
            id="con_pass"
            sx={{ width: "280px" }}
            color="secondary"
            variant="standard"
            type="password"
            label="Confirm Password"
            
          />
        </div>
        <div className="btn_chgpass">
        <label htmlFor="btn_chgpass"></label>
        <Button type='submit' name='btn_chgpass'  className='btn' variant="contained" color='secondary'>Change Password</Button>
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

export default ChangePassword