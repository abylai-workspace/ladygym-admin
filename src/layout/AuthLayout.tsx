import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import LoginContext from "../store/loginContext";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { storageReadItem } from "../utils/asyncStorage";
import { TOKEN_KEY } from "../constants/constants";

const AuthLayout = () => {
  const location = useLocation();
  // const loginCtx = useContext(LoginContext);
 
  // const tokenStorage = useSelector((state:any) => state.auth.token);
  // const tokenStorage = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNzA2ODgyMjcxIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjk0ODQ0NTcyLCJpYXQiOjE2OTQ2NzE3NzJ9.g9Oj3MOk-9MLtypwlIA2HJmqyuevmg-IoS8JhT_nwHIVx0G9NsMZx-OFMxWb5-GlV1ugSlxDPiaWSN1fi9b-cQ';
  const user=useSelector((state: any) => state?.auth);
  
  console.log(user,'useruseruser');
  // console.log('tokenStorage', tokenStorage);
  

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- current location so login can redirect back is desired
    />
  );
};

export default AuthLayout;
