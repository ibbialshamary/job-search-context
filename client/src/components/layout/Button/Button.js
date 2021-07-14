import React from "react";
import classes from "./Button.scss";

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.class} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
