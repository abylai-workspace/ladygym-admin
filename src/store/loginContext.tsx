import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type TContext = {
  isLogin: boolean;
  toggleLogin: () => void;
};

const LoginContext = React.createContext<TContext>({
  isLogin: false,
  toggleLogin: () => {},
});

export const LoginContextProvider: React.FC = (props) => {
  const [profile, setProfile] = useState();
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);

  // useEffect(() => {
  //   AuthService.getUserInfo()
  //     .then((res) => {
  //       setProfile(res);
  //       setIsLogin(true);
  //     })
  //     .catch((err) => setIsLogin(false));
  //   // fetchReq().then((res) => console.log(res));
  // }, []);

  function toggleLogin() {
    setIsLogin((prev) => !prev);
  }

  const loginValue: TContext = {
    isLogin: isLogin,
    toggleLogin: toggleLogin,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
