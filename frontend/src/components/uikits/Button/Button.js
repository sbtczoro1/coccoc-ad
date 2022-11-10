import React from "react";
import "./Button.scss";

const Button = ({ children, onClick, ...buttonProps }) => {
  return (
    <button
      onClick={onClick}
      {...buttonProps}
      className={buttonProps.disabled ? "btn--disabled" : ""}
    >
      {children}
    </button>
  );
};

export default Button;
