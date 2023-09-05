 import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "./AuthForm/AuthForm";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchUserData, loginUser } from "../services/reducers/user";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthCheck } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(user));
      if (response && response.success) {
        history.push("/profile");
      } else {
         console.log("Login failed");
      }
    } catch (error) {
       console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (isAuthCheck) {
      dispatch(fetchUserData());
    }
  }, [dispatch, isAuthCheck]);

  return (
    <AuthForm
      formName="log_in"
      title="Вход"
      onSubmit={handleSubmitLogIn}
      buttonText="Войти"
      linkText="Вы - новый пользователь?"
      linkTitle="Зарегистрироваться"
      linkTo="/register"
      secondLinkText="Забыли пароль?"
      secondLinkTitle="Восстановить пароль"
      secondLinkTo="/forgot-password"
      isAuthCheck={isAuthCheck}
    >
      <EmailInput
        onChange={handleChange}
        value={user.email}
        name="email"
        placeholder="E-mail"
        autoComplete="email"
      />
      <PasswordInput
        onChange={handleChange}
        value={user.password}
        name="password"
        placeholder="Пароль"
        autoComplete="current-password"
      />
    </AuthForm>
  );
}

export default LoginPage;
