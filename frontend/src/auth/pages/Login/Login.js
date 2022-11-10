import React from "react";
import useTranslate from "@hooks/useTranslate";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.scss";

const Login = () => {
  const translate = useTranslate();

  return (
    <div className="login-page">
      <div>
        <h1>{translate.login.heading}</h1>
        <div className="mt-16 mb-24">
          <span>{translate.login.dont_have_account}</span>
          <a href="/signup" className="ml-8" target="_blank">
            {translate.login.sign_up_here}
          </a>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
