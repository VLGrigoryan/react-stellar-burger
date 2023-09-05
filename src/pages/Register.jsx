// RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchUserData } from "../services/reducers/user";
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
  const { isAuthCheck } = useSelector((state) => state.user);
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
  useEffect(() => {
    if (isAuthCheck) {
      dispatch(fetchUserData());
    }
  }, [dispatch, isAuthCheck]);

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
      isAuthCheck={isAuthCheck}
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
