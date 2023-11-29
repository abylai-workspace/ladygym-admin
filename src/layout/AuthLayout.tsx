import { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthService from "../servises/authNew";

const AuthLayout = () => {
  const location = useLocation();
  const [profile, setProfile] = useState("1234");

  useEffect(() => {
    AuthService.getUserInfo().then((res) => {
      setProfile(res);
      localStorage.setItem("user", JSON.stringify(res));
    });
  }, []);

  return profile ? (
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
