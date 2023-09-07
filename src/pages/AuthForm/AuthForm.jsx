 import React from "react";
import { Link} from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import APStyles from "./AuthForm.module.css";

const AuthForm = ({
  children,
  formName,
  title,
  onSubmit,
  buttonText,
  linkText,
  linkTitle,
  linkTo,
  secondLinkText,
  secondLinkTitle,
  secondLinkTo,
}) => {

  return (
    <div className={`${APStyles.container} mt-30 pt-15`}>
      <form className={APStyles.form} name={formName} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium">{title}</h2>
        {children}
        <Button type="primary" size="medium" htmlType="submit">
          {buttonText}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        {linkText}&#8194;
        <Link to={linkTo} className={APStyles.link}>
          {linkTitle}
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {secondLinkText}&#8194;
        <Link to={secondLinkTo} className={APStyles.link}>
          {secondLinkTitle}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
