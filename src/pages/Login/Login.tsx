import { useState } from "react";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import { decode as atob, encode as btoa } from "base-64";
import * as Yup from "yup";

import classes from "./Login.module.scss";
import classesButton from "../../components/UI/button/Button.module.scss";
import { useNavigate } from "react-router-dom";
// import Input from "../../components/UI/input/Input";
import { Controller, useForm } from "react-hook-form";
import { InputBlack } from "../../components/UI/input/InputBlack";
import AuthService from "../../servises/authNew";
import { removeTokens, setToken } from "../../servises/tokenService";

export const Login = () => {
  const [otp, setOtp] = useState();
  const [showotp, setShowOtp] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: String,
      password: String,
    },
  });

  const navigate = useNavigate();
  // const validationSchema = Yup.object().shape({
  //   username: Yup.string().required("Username is required"),
  //   password: Yup.string()
  //     .min(2, "Password must be at least 6 characters")
  //     .required("Password is required"),
  // });

  // const validationOtp = Yup.object().shape({
  //   phoneNumber: Yup.string().required("Phone Number is required"),
  //   code: Yup.string().required("OTP is required"),
  // });

  const onSubmit = async (values: any) => {
    removeTokens();
    AuthService.loginInstance(values?.username, values?.password)
      .then((res) => {
        if (res) {
          setToken(res?.accessToken);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  // const onLogin = async (values: Record<string, string>) => {
  //   console.log(values);
  //   AuthService.login(values?.username, values?.password)
  //     .then((res) => {
  //       console.log(res);
  //       // navigate('/')
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleChange = async (values: Record<string, string>) => {
    const credentials = `${values.username}:${values.password}`;
    console.log(credentials);
  };

  return (
    <div className={`${classes.container}`}>
      <div className={classes.loginBox}>
        <h2 className={classes.title}>Вход</h2>
        <h2 className={classes.subtitle}>
          Сеть женских фитнес-клубов «LADY GYM»
        </h2>

        {!showotp && (
          <form onSubmit={handleSubmit(onSubmit)} className={classes.formm}>
            <div className={classes.formItem}>
              <h3 className={classes.label}>Номер телефона</h3>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <InputBlack
                    type="text"
                    id={"username"}
                    placeholder="Введите ваш номер телефона"
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <div className={classes.formItem}>
              <h3 className={classes.label}>Пароль</h3>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <InputBlack
                    type="password"
                    id={"password"}
                    placeholder="Введите ваш пароль"
                    onChange={onChange}
                  />
                )}
              />
            </div>

            <button
              type="submit"
              className={`${classesButton.btn} ${classesButton.button}`}
            >
              {"Войти"}
            </button>
          </form>
        )}

        {/* {!showotp && (
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            // validationSchema={validationSchema}
            onSubmit={onLogin}
          >
            {({ isSubmitting, errors, touched, setFieldValue }) => (
              <Form className={classes.formm}>
                <div className={classes.formItem}>
                  <h3 className={classes.label}>Номер телефона</h3>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Введите ваш номер телефона"
                    onChange={(e) => setFieldValue}
                    as={Input}
                  />
                  {errors.username && touched.username && (
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error"
                    />
                  )}
                </div>
                <div className={classes.formItem}>
                  <h3 className={classes.label}>Пароль</h3>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Введите ваш пароль"
                    as={Input}
                  />
                  {errors.password && touched.password && (
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${classesButton.btn} ${classesButton.button}`}
                >
                  {isSubmitting ? "Logging in..." : "Войти"}
                </button>
              </Form>
            )}
          </Formik>
        )} */}
      </div>
    </div>
  );
};
