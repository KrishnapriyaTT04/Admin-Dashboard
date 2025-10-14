import React from 'react';
import { AppBar, Toolbar, Typography, Link, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { drawerWidth } from 'store/constant';

const Footer = () => {
  const theme = useTheme();
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  return (
    <AppBar
      position="static" // or "fixed" if you want it always visible at bottom
      elevation={0}
      sx={{
        top: 'auto',
        bottom: 0,
        width: {
          xs: '100%',
          md: leftDrawerOpened ? `calc(100% - ${drawerWidth}px)` : '100%'
        },
        ml: {
          md: leftDrawerOpened ? `${drawerWidth}px` : 0
        },
        height: 80,
        background: 'linear-gradient(180deg, #019863, #019863)',
        color: '#fff'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%' // ensures text is vertically centered
        }}
      >
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Designed and Developed by{' '}
          <Link
            href="https://frugalscientific.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#fff',
              textDecoration: 'underline',
              fontWeight: 500,
              '&:hover': { color: '#d0f0e0' }
            }}
          >
            Frugal Scientific Pvt Ltd
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
