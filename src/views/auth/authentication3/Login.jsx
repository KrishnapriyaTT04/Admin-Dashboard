import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { Box, Button, Card, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormikTextField from 'ui-component/common/loginInput';
import { userLogin } from 'container/LoginContainer/slice';

import logo from 'assets/images/logo.png';

const AuthLogin = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const cookieNames = ['user_id', 'full_name', 'sid', 'user_image'];
    cookieNames.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  }, []);

  useEffect(() => {
    if (props.failAction && props.failAction.statusText) {
      setLoginError(props.failAction.statusText);
      const errorTimeout = setTimeout(() => {
        setLoginError('');
      }, 3000);

      return () => clearTimeout(errorTimeout);
    }
  }, [props.failAction]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Card
        sx={{
          width: { xs: '90%', sm: '28rem' },
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: '100%', mb: 3, display: 'flex', justifyContent: 'center' }}>
          {/* <img src={logo} alt="Logo" style={{ height: '40px' }} /> */}
           <Typography variant="h2" component="h1" sx={{ mb: 3, color: 'text.primary' }}>
         Kloo
        </Typography>
        </Box>
        <Typography variant="h4" component="h1" sx={{ mb: 3, color: 'text.primary' }}>
          Log in
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validate}
          onSubmit={(value) => {
            dispatch(userLogin({ ...value, navigate }));
          }}
        >
          {() => (
            <Form style={{ width: '100%' }}>
              <Box sx={{ paddingBottom: '15px' }}>
                <FormikTextField name="email" label="Enter Your Email Address" type="text" />
              </Box>
              <FormikTextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  width: '100%',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>

        {loginError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Invalid User name or Password
          </Typography>
        )}

        <Stack direction="column" spacing={1} sx={{ mt: 3, width: '100%', alignItems: 'center' }}>
          <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary.main" fontWeight="bold">
              Forgot Password?
            </Typography>
          </Link>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don't have an account?
            </Typography>
            <Link to="/SignupRole" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary.main" fontWeight="bold">
                Sign Up
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthLogin;
