import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import toast, { Toaster } from 'react-hot-toast';

// const settings = ['Profile', 'Account', 'Logout'];

function NavbarApp() {
  
  const [token, setToken] = React.useState('');
  const navigate = useNavigate();
  
  
  

  useEffect(() => {
    // Retrieve the email from local storage when the component mounts
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);
   // Retrieve the token from the "token" cookie when the component mounts
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');

     if (name === 'token') { // Check for the "token" cookie
        setToken(decodeURIComponent(value));
        break;
      }
    }
  }, []);

  const pages = ['Home','About', 'location'];

  function userLogout(){
    //   localStorage.removeItem('token')
    // setToken('')
     const pastExpirationDate = new Date(0).toUTCString(); // A date in the past
  document.cookie = `token=; expires=${pastExpirationDate}; path=/`;

  // Optionally, clear the token from your application state if needed
  setToken(''); // Assuming setToken is a function to update your state
  }
function userchangePassword(){
  token ?
  navigate('/forgetpassword')
  
  
  :
  toast.error('Cannot validate User...!')
}


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{bgcolor:'white'}} >
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'black',
              textDecoration: 'none',

            }}
          >
            Cospace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}  onClick={handleCloseNavMenu}>
                  <Typography component="a"
                  href={page.toLowerCase()}
             textAlign="center" 
             sx={{color:'black',textDecoration:'none'}}
             >{page}</Typography>
                </MenuItem>
              ))}
              {/* <MenuItem onClick={handleCloseNavMenu} component={Link} to="/about">
                About
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/location">
                Location
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/contact">
                Contact
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/blog">
                Blog
              </MenuItem> */}
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: '2',
              display: { xs: 'flex', md: 'none', },
              textAlign:'center',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Cospace
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component="a"
                  href={page.toLowerCase()}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block'}}
              > 
                {page}
              </Button>
            ))}
            {/* <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block'}}>About</Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block'}}>Location</Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block'}}>Contact</Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'black', display: 'block'}}>Blog</Button> */}
          </Box>
          {token ? (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="More Option">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Unknown User" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMountedmeu
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem onClick={userchangePassword} >Change Password</MenuItem>
              <MenuItem onClick={userLogout}>Logout</MenuItem>
            </Menu>
          </Box>):<Link to='/login'>
          <Tooltip title="login">
          <Button  variant="outlined" color='secondary' >Log In</Button>
          </Tooltip>
          </Link>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarApp;