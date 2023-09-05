import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import AuthForm from "./AuthForm/AuthForm";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux"; // Import useHistory
import { resetPasswordApi } from "../utils/api"; // Import the action creator

function ResetPasswordPage() {
   const [user, setUser] = useState({
    token: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    const data = {
      password: user.password,
      token: user.token,
    };
    dispatch(resetPasswordApi(data))
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <AuthForm
      formName="reset-password"
      title="Восстановление пароля"
      onSubmit={handleSubmitResetPassword}
      values={user}
      buttonText="Сохранить"
      linkText="Вспомнили пароль?"
      linkTitle="Войти"
      linkTo="/login"
      isAuthCheck={false}
      secondLinkTo=""
    >
      <PasswordInput
        onChange={handleChange}
        value={user.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
        autoComplete="password"
      />
      <Input
        onChange={handleChange}
        value={user.token}
        name={"token"}
        placeholder={"Введите код из письма"}
      />
    </AuthForm>
  );
}

export default ResetPasswordPage;
