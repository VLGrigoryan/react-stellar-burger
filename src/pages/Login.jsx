 import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "./AuthForm/AuthForm";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../services/reducers/user";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
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
