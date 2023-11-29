import React, { useContext, useEffect, useState } from "react";

// import LoginContext from "../../store/loginContext";
import langContextObj from "../../store/langContext";
import { decode as atob, encode as btoa } from "base-64";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

// import Input from "../UI/input/Input";
// import Button from "../UI/button/Button";
// import { useTranslation } from "react-i18next";
import classes from "./Login.module.scss";
import classesButton from "../UI/button/Button.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "../../store/slices/authSlice";
import { setRole } from "../../store/slices/roleSlice";
import { instance, saveAccessTokens } from "../../config/api";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "../../constants/constants";
import { storageDeleteItem, storageReadItem } from "../../utils/asyncStorage";
import OTPInput, { ResendOTP } from "otp-input-react";
// import axios from "axios";

function LoginBox() {
  const [otp, setOtp] = useState();
  const [showotp, setShowOtp] = useState(false);
  const user = useSelector((state) => state?.auth);
  const [token, setToken] = useState("");
  useEffect(() => {
    storageReadItem(TOKEN_KEY).then((e) => {
      setToken(e);
    });
  }, []);
  console.log(token);
  const dispatch = useDispatch();
  const langCtx = useContext(langContextObj);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username Name is required"),
    password: Yup.string()
      .min(2, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const validationOtp = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone Number is required"),
    code: Yup.string().required("OTP is required"),
  });
  const onLogin = async (values) => {
    dispatch(loginStart());
    console.log(values);

    const credentials = `${values.username}:${values.password}`;
    const base64Credentials = btoa(credentials);
    try {
      const response = await instance.post("/gym/auth/login", null, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      });
      const { role, accessToken } = response.data;

      if (role === "USER") {
        console.log(response);
        localStorage.setItem("user-and-admin", response);
        navigate("/");
      }
      if (role === "ADMIN") {
        // await storageDeleteItem(TOKEN_KEY);
        // await storageDeleteItem(REFRESH_TOKEN_KEY);
        // await localStorage.setItem("token", response.accessToken);
        setToken(response.accessToken);

        await saveAccessTokens(response);
        dispatch(setRole(role));
        dispatch(loginSuccess({ user: values, token: accessToken }));
        console.log(response);
        navigate("/");
        if (response.status === 401) {
          await setShowOtp(!showotp);
        }
      } else if (role === "MANAGER") {
        await storageDeleteItem(TOKEN_KEY);
        await storageDeleteItem(REFRESH_TOKEN_KEY);
        await saveAccessTokens(response);
        dispatch(setRole(role));
        dispatch(loginSuccess({ user: values, token: accessToken }));
        navigate("/");
        if (response.status === 400 && response.statusText === "Bad Request") {
          await setShowOtp(!showotp);
        }
      } else if (role === "TOP") {
        // await storageDeleteItem(TOKEN_KEY);
        // await storageDeleteItem(REFRESH_TOKEN_KEY);
        await saveAccessTokens(response);
        dispatch(setRole(role));
        dispatch(loginSuccess({ user: values, token: accessToken }));
        navigate("/");
        if (response.status === 400 && response.statusText === "Bad Request") {
          await setShowOtp(!showotp);
        }
      }
      return { success: true };
      // navigation.navigate(SCREENS.MULTIONBOARDING as never);
    } catch (error) {
      console.error("Registration failed:", error);
      return error;
    }
  };
  const handleChange = async (values) => {
    const credentials = `${values.username}:${values.password}`;
    console.log(credentials);

    //    const users=user?.user?.username
    //    console.log(users,'values');

    //     try {
    //         const response= await instance.post('/gym/auth/verify', {
    //             phoneNumber:`${users}`,
    //             code:otp
    //         },{
    //             headers:{
    //                 Authorization:`Bearer ${tokenStorage}`
    //             }
    //         });
    //         if(response.status === 200){
    //             navigate("/");
    //         }
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error,'error');
    //     }
  };

  return (
    <div
      className={`${classes.container} ${
        langCtx.lang === "fa" ? classes.rtl : ""
      }`}
    >
      <div className={classes.loginBox}>
        <h2 className={classes.title}>Вход</h2>
        <h2 className={classes.subtitle}>
          Сеть женских фитнес-клубов «LADY GYM»{" "}
        </h2>
        {showotp && (
          <>
            <Formik
              initialValues={{
                phoneNumber: "",
                code: "",
              }}
              validationSchema={validationOtp}
              onSubmit={handleChange}
            >
              {({ isSubmitting }) => (
                <Form>
                  <OTPInput
                    name="code"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    separator={<span></span>}
                    shouldAutoFocus
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${classesButton.btn} ${classesButton.button}`}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            {/* <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            separator={<span></span>}
                            shouldAutoFocus
                        /> */}
            <br />
            {/* <button
                            type='submit'
                            className={`${classesButton.btn} ${classesButton.button}`}
                            onChange={handleChange}
                        >
                            {"Login"}
                        </button> */}
            {/* <Button onClick={handleChange} type="submit">Login</Button> */}
          </>
        )}
        {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}

        {!showotp && (
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onLogin}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className={classes.formm}>
                <div style={{ width: "100%" }}>
                  <h3 className={classes.label}>Номер телефона</h3>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <h2 className={classes.label}>Пароль</h2>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${classesButton.btn} ${classesButton.button}`}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}

export default LoginBox;
