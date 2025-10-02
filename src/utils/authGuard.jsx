import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginSuccess } from 'container/LoginContainer/slice';

const AuthGuard = ({ children, user }) => {
  const dispatch = useDispatch();
  // const isAuthenticated = JSON.parse(localStorage.getItem('userDtls'));
  // const checkUser = user && user?.includes(isAuthenticated?.message?.roles);
     const isAuthenticated = JSON.parse(localStorage.getItem('userToken'));

      //const isAuthenticated = true;
    const checkUser = true
            console.log("===================================isAuthenticated====---0----------",isAuthenticated);



  useEffect(() => {
    dispatch(loginSuccess(isAuthenticated));
  }, [user]);

  if (!isAuthenticated) {
            console.log("=============================================$$$$$$$$$$$$---0----------",);

    return <Navigate to="/login" replace={true} />;
  } else if (!checkUser && user != null) {
    console.log("=============================================$$$$$$$$$$$$-------------",);
    
    return <Navigate to="/not-found" replace={true} />;
  } else {
        console.log("=============================================$$$$$$$$$$$$---2----------",);

  }

  return children;
};

export default AuthGuard;
