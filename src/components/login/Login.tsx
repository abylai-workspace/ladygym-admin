import React, { useContext, useRef } from "react";

import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";

import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

function LoginBox() {
  const loginCtx = useContext(LoginContext);
  const langCtx = useContext(langContextObj);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passRef=useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  let isValid = true;
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    isValid = userNameRef.current?.value === "admin";
    if (userNameRef.current && passRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();
        navigate("/");
      } else {
        userNameRef.current.focus()
        passRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    }
  }

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
       
        <h2 className={classes.title}>Вход</h2>
        <h2 className={classes.subtitle}>Сеть женских фитнес-клубов «LADY GYM» </h2>
        <form onSubmit={loginHandler}>
          <h3 className={classes.label}>Номер телефона</h3>
          <Input
            ref={userNameRef}
            type={"text"}
            id={"userName"}
            placeholder={"admin"}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <h2 className={classes.label}>Пароль</h2>
          <Input
          ref={passRef}
            type={"password"}
            id={"pass"}
            value={"admin"}
            readonly={false}
            placeholder="password"
          />
            <span ref={errorMessageRef} className={classes.errorMessage}>
            {t("errorMessage")}
          </span>
          <Button type="submit">{t("login")}</Button>
          {/* <Link className={classes.forgat_pass} to="/">
            {t("forgetPass")}
          </Link> */}
          {/* <div className={classes.checkbox}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">{t("rememberMe")}</label>
          </div> */}
        </form>
      </div>


    </div>
  );
}

export default LoginBox;
