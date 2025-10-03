import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Divider
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import FormikTextField from 'ui-component/common/loginInput';
import { userLogin } from 'container/LoginContainer/slice';
import logo from "C:/Users/DELL/Desktop/kloo_admin_react_v2/src/assets/images/auth/kloo-icon.svg";

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
    ['user_id', 'full_name', 'sid', 'user_image'].forEach((cookie) => Cookies.remove(cookie));
  }, []);

  useEffect(() => {
    if (props.failAction?.statusText) {
      setLoginError(props.failAction.statusText);
      const timeout = setTimeout(() => setLoginError(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [props.failAction]);

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        px: 2
      }}
    >
      <Card
        sx={{
          width: { xs: '100%', sm: '400px', md: '450px' },
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src={logo}
            alt="Kloo Logo"
            sx={{ height: { xs: 35, sm: 45 }, maxWidth: '100%' }}
          />
        </Box>

        {/* Heading */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 2,
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: 0.5,
            color: 'text.primary'
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          Log in to your account to continue
        </Typography>

        {/* Formik Form */}
        <Formik
          initialValues={{ client_id: 'webapp', client_secret: 'saqw21!@', email: '', password: '' }}
          validationSchema={validate}
          onSubmit={(values) => dispatch(userLogin({ ...values, navigate }))}
        >
          {() => (
            <Form style={{ width: '100%' }}>
              <Stack spacing={2}>
                <FormikTextField
                  name="email"
                  label="Email Address"
                  type="text"
                  fullWidth
                />
                <FormikTextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
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

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#fff',
                    backgroundImage: 'linear-gradient(180deg, #019863, #019863)',
                    borderRadius: 2,
                      border: '1px solid #019863',
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#019863',
                      border: '1px solid #019863',
                      backgroundImage: 'none',
                    }
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>

        {/* Error message */}
        {loginError && (
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {loginError}
          </Typography>
        )}

        {/* Divider */}
        <Divider sx={{ my: 3, width: '100%' }} />

        {/* Footer links */}
        <Stack direction="column" spacing={1} sx={{ width: '100%', alignItems: 'center' }}>
          <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary.main" fontWeight="600">
              Forgot Password?
            </Typography>
          </Link>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Don’t have an account?
            </Typography>
            <Link to="/SignupRole" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary.main" fontWeight="600">
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
