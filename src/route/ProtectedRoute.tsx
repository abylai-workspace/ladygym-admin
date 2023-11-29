import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import LoginContext from "../store/loginContext";
import { useSelector } from "react-redux";

// interface Props {
//   isAuthenticated: boolean;
//   authenticationPath: string;
//   outlet: JSX.Element;
// }

const ProtectedRoute: React.FC = (props) => {
  const loginCtx = useContext(LoginContext);
  return <Login />;
};

export default ProtectedRoute;
