import React, { useEffect } from 'react';
import { useState } from 'react';

import './RecoverOTP.css';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import {toast,Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function RecoverOTP() {
  
  const navigate = useNavigate();
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const email = queryParams.get('email');
  const email = location.state.email;
  console.log("Email:",email);
  const t='false';
  const [OTP,setOTP]=useState();
  useEffect(() => {
    if (email ) {
      generateOTP(email)
        .then((OTP) => {
          console.log(OTP)
          if (OTP){ return toast.success('OTP has been sent Successfully')
        }
          return toast.error('Problem while generating OTP');
        })
    }
  }, []);


  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ email, code: OTP });
      if (status === 201) {
        toast.success('Verify Successfully!');
        return navigate('/forgetpassword/recoverotp/changepassword', { state: { email: email } });
      } else if (status === 400) {
        toast.error('Wrong OTP! Check email Again');
      } else {
        toast.error('An error occurred while verifying OTP.1');
      }
    } catch (error) {
      toast.error('Wrong Otp,Check Again');
    }
  }
  

  // //handle resend OTP function 
  function resendOTP(){
    let sendPromise =generateOTP(email)
    toast.promise(sendPromise,{
      loading:'Sending..',
      success: <b>OTP has been send to your email </b>,
      error:<b>Could not Send it!</b>,
    });
    sendPromise.then(OTP=>{
      console.log(OTP)
    })
  }
  // }
  
  return (
    <div className='recotp'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <form action='/home' className="recotp_container" onSubmit={onSubmit}>
        <div className="recotp_avatar">
        <Avatar className='Avatar' sx={{height:'85px',width:'85px'}}/>
        </div>
        <div className='text_for' >
          <Typography variant='h5'>Recover password</Typography>
        <Typography className='p' variant='p' >Please enter the 6 digit otp , send to your email address to reset password</Typography>
        </div> 
        <div className="recotp_email">
          <label htmlFor="otp"></label>
        <TextField onChange={(e)=>{
          setOTP(e.target.value)
        }} name='otp' sx={{width:'280px'}} color='secondary' variant="standard" type='tel' label="Enter OTP " required/>
        </div>
        <div className="btn_recotp">
        <label htmlFor="btn_recotp"></label>
        <Button type='submit' name='btn_recotp'  className='btn' variant="contained" color='secondary'>Verify OTP</Button>
        </div>
        
        
        <div className="resendOtp">
            <Button onClick={resendOTP} >Resend OTP</Button>
        </div>
      </form>
    </div>
  )
}

export default RecoverOTP