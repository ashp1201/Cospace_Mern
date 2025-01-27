import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './adminlogin.css';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { adminValidate } from '../helper/validate';
import { loginAdmin } from '../helper/helper';

const Adminadminlogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: adminValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const adminloginPromise = loginAdmin({ email: values.email, password: values.password });
      toast.promise(adminloginPromise, {
        loading: 'Checking ....',
        success: <b>Login Successful!</b>,
        error: <b>Incorrect Password!</b>,
      });

      adminloginPromise
        .then((res) => {
          const { token } = res.data;
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
          document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
          setTimeout(() => navigate('/admin/dashboard'), 1000);
        })
        .catch((error) => {
          console.error('Login error:', error);
          toast.error(error.response?.data?.message || 'An unexpected error occurred.');
        });
    },
  });

  const cloudinaryAvatarUrl = 'https://res.cloudinary.com/demo/image/upload/v123456789/avatar.png';

  return (
    <div className="adminlogin">
      <Toaster position="top-center" reverseOrder={false} />

      <form className="adminlogin_container" onSubmit={formik.handleSubmit}>
        <div className="adminlogin_avatar">
          <Avatar src={cloudinaryAvatarUrl} className="Avatar" sx={{ height: '85px', width: '85px' }} />
        </div>
        <div className="adminlogin_email">
          <TextField
            {...formik.getFieldProps('email')}
            name="email"
            sx={{ width: '230px' }}
            color="secondary"
            variant="standard"
            type="email"
            label="Email"
          />
        </div>
        <div className="adminlogin_password">
          <TextField
            {...formik.getFieldProps('password')}
            name="password"
            sx={{ width: '230px' }}
            color="secondary"
            variant="standard"
            type="password"
            label="Password"
          />
        </div>
        <div className="btn_adminlogin">
          <Button type="submit" className="btn" variant="contained" color="secondary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Adminadminlogin;
