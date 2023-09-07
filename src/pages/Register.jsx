// RegisterPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/reducers/user";
import AuthForm from "./AuthForm/AuthForm";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();
   const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    dispatch(registerUser(user)).then((res) => {
      if (res.success) {
        history.push("/login");
      } else {
        console.log("Registration failed");
      }
    });
  }; 

  return (
    <AuthForm
      formName="sign_in"
      title="Регистрация"
      onSubmit={handleSubmitSignIn}
      buttonText="Зарегистрироваться"
      linkText="Уже зарегистрированы?"
      linkTitle="Войти"
      linkTo="/login"
      secondLinkTo=""
    >
      <Input
        onChange={handleChange}
        value={user.name}
        name="name"
        placeholder="Имя"
      />
      <EmailInput onChange={handleChange} value={user.email} name="email" />
      <PasswordInput
        onChange={handleChange}
        value={user.password}
        name="password"
        autoComplete="password"
      />
    </AuthForm>
  );
}

export default RegisterPage;
