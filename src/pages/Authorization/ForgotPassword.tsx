import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { requestResetUserPassword } from "../../utils/api";
import AuthForm from "../AuthForm/AuthForm";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmitForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    requestResetUserPassword(email).then((res) => {
      if (res.success) {
        history.replace("/reset-password");
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
      secondLinkText=""
      secondLinkTitle=""
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
