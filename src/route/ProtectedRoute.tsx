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
  console.log(userRole);
  const tokenStorage = useSelector((state:any) => state.auth.token);
  console.log('tokenStorage', tokenStorage);
  
  const loginCtx = useContext(LoginContext);
  return tokenStorage ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
