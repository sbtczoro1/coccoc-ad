import React from "react";
import "./Input.scss";

const Input = ({ type = "text", ...inputProps }) => {
  return <input type={type} {...inputProps} />;
};

export default Input;
