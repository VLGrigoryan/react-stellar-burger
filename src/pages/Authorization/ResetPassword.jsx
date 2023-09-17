import React, { useState } from "react";
import {  useHistory } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPasswordApi } from "../../utils/api"; 

function ResetPasswordPage() {
   const [user, setUser] = useState({
    token: "",
    password: "",
  });
  const [setError] = useState(null);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
   const history = useHistory();

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    resetPasswordApi(user)
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
