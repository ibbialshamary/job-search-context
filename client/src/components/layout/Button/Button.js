import React from "react";
import classes from "./Button.scss";

const Button = (props) => {
  return (
    <button className={props.class} type={props.type}>
      {props.children}
    </button>
  );
};

export default Button;
