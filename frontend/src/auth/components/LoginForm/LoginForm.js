/* eslint-disable */
import React, { useContext, useState } from "react";
import Button from "@uikits/Button/Button";
import useTranslate from "@hooks/useTranslate";
import useHttpClient from "@hooks/useHttpClient";
import { CheckBoxBlank, CheckBoxChecked, CautionCircle } from "@icons/Login";
import { getErrorMessageOnField, getAllErrorsForm } from "@helpers/form";
import Input from "../../../components/uikits/Input/Input";
import { Eye as EyeIcon } from "@icons/Login";
import loginFormRules from "../../formRules/Login";
import AppContext from "../../../context/AppContext";
import { setStorage } from "../../../helpers/localstorage";
import {
  EMAIL_COCCOC_STORAGE,
  TIME_OUT_CLICK_BUTTON,
  TOKEN_COCCOC_STORAGE,
  MILISECOND_ONE_DAY,
} from "@constants";
import "./LoginForm.scss";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorForm, setErrorForm] = useState({});
  const [errorApi, setErrorApi] = useState(null);
  const [disabledClick, setDisabledClick] = useState(false);
  const [appData, setAppData] = useContext(AppContext);

  const translate = useTranslate();
  const httpClient = useHttpClient();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setErrorForm({
      ...errorForm,
      [name]: "",
    });
    setErrorApi(null);
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleBlurInput = (e) => {
    const { name, value } = e.target;
    const errorMessage = getErrorMessageOnField(
      name,
      value,
      loginFormRules,
      loginData
    );

    setErrorForm({
      ...errorForm,
      [name]: errorMessage,
    });
  };

  const validateLoginForm = () => {
    const allErrorsForm = getAllErrorsForm(loginFormRules, loginData);
    if (Object.keys(allErrorsForm).length > 0) {
      setErrorForm(allErrorsForm);
      return;
    }
  };

  const handleSubmitLoginForm = async (e) => {
    if (disabledClick) {
      return;
    }
    validateLoginForm();
    setDisabledClick(true);

    const apiLoginUrl = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/auth/login`;
    const result = await httpClient.sendRequest(
      apiLoginUrl,
      "POST",
      JSON.stringify(loginData),
      {
        "Content-Type": "application/json",
      }
    );

    if (result?.errors) {
      setErrorApi(result?.errors);
      setTimeout(() => {
        setDisabledClick(false);
      }, TIME_OUT_CLICK_BUTTON);
      return;
    }

    setErrorApi(null);

    if (result?.token) {
      const timeToLiveStorageKey = MILISECOND_ONE_DAY;
      setStorage(TOKEN_COCCOC_STORAGE, result?.token, timeToLiveStorageKey);
      setStorage(
        EMAIL_COCCOC_STORAGE,
        result?.user?.email,
        timeToLiveStorageKey
      );
      setAppData({
        ...appData,
        isLogged: true,
        email: result?.user?.email,
      });
    }
  };

  const renderErrorMessage = (message) => {
    return (
      <div className="d-flex align-items-center error">
        <CautionCircle />
        <p className="ml-8">{message}</p>
      </div>
    );
  };

  const isDisabledLoginButton =
    !loginData.email.trim() || !loginData.password.trim();

  return (
    <div className="login-form">
      <label htmlFor="email">{translate.login.email}</label>
      <Input
        placeholder={translate.login.placeholder.email}
        className={errorForm?.email ? "error" : ""}
        id="email"
        name="email"
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
      />
      {errorForm?.email && renderErrorMessage(errorForm?.email)}

      <label htmlFor="password" className="mt-16">
        {translate.login.password}
      </label>
      <div className="password-field">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={translate.login.placeholder.password}
          className={errorForm?.password ? "error" : ""}
          id="password"
          name="password"
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
        />
        <EyeIcon
          className={"password-icon " + (showPassword ? "show" : "hide")}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </div>
      {errorForm?.password && renderErrorMessage(errorForm?.password)}

      {errorApi &&
        errorApi.map((error, index) => (
          <div key={index} className="mt-16">
            {renderErrorMessage(error.msg)}
          </div>
        ))}

      <div className="d-flex align-items-center justify-content-between mt-16 mb-24">
        <div
          className="d-flex remember"
          onClick={() => setRememberMe(!rememberMe)}
        >
          {rememberMe ? <CheckBoxChecked /> : <CheckBoxBlank />}
          <span className="ml-8">{translate.login.remember_me}</span>
        </div>

        <a href="/forgot-password" target="_blank">
          {translate.login.forgot_password}
        </a>
      </div>

      <Button
        onClick={isDisabledLoginButton ? null : handleSubmitLoginForm}
        disabled={isDisabledLoginButton}
      >
        {httpClient.isLoading
          ? translate.login.processing
          : translate.login.login}
      </Button>
    </div>
  );
};

export default LoginForm;
