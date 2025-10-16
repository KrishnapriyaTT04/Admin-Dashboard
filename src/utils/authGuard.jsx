import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess } from 'container/LoginContainer/slice';

const AuthGuard = ({ children, user }) => {
  const dispatch = useDispatch();
  const isAuthenticated = JSON.parse(localStorage.getItem('klooToken'));
  const checkUser = true;

  useEffect(() => {
    dispatch(loginSuccess(isAuthenticated));
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  } else if (!checkUser && user != null) {
    return <Navigate to="/not-found" replace={true} />;
  } else {
  }

  return children;
};

export default AuthGuard;
