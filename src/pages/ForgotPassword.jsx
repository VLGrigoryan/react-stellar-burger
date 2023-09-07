import React, { useState } from "react";
import { requestResetUserPassword } from "../utils/api";
import AuthForm from "./AuthForm/AuthForm";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
 
function ForgotPasswordPage() {
   const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmitForgotPassword = async (e) => {
    e.preventDefault();
     requestResetUserPassword(email).then((res) => {
        if (res.success) {
          history.replace("/reset-password" );
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <AuthForm
      formName="forgot_password"
      title="Восстановление пароля"
      onSubmit={handleSubmitForgotPassword}
      buttonText="Восстановить"
      linkText="Вспомнили пароль?"
      linkTitle="Войти"
      linkTo="/login"
      secondLinkTo=""
    >
      <EmailInput
        onChange={handleChange}
        value={email}
        name="email"
        placeholder="Укажите e-mail"
      />
      {error && (
        <p className="text text_type_main-default text_color_error">{error}</p>
      )}
    </AuthForm>
  );
}

export default ForgotPasswordPage;
