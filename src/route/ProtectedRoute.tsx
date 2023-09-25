import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import LoginContext from "../store/loginContext";
import { useSelector } from "react-redux";

// interface Props {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   outlet: JSX.Element;
// }
const ProtectedRoute: React.FC = (props) => {
  const userRole = useSelector((state:any) => state.role.role);
 
  const tokenStorage = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNzA2ODgyMjcxIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjk1MTI4NTE1LCJpYXQiOjE2OTQ5NTU3MTV9.hXaV1hUvk95y5GEF2rB4E0zrXdIkbbWD1Zg6xT2IIMlOiOwv1bS3_1qoCU_a74SGynNwR18Rv2EqVdHZY_2wAA';

  
  const loginCtx = useContext(LoginContext);
  return tokenStorage ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
