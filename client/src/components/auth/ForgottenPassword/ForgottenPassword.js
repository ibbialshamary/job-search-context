import React from "react";
import Button from "../../layout/Button/Button";
import Modal from "../../layout/Modal/Modal";
import classes from "./ForgottenPassword.module.scss";

const ForgottenPassword = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className="form-container">
        <strong>
          <h1>Password Reset</h1>
        </strong>
        <p>
          To reset your password, enter the email address you use to sign in to
          Basra
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email-address">Email Address</label>
          <input type="email" />
          <Button>Send Reset Instructions</Button>
          <Button class="secondary" onClick={props.onClose}>Go Back</Button>
        </form>
      </div>
    </Modal>
  );
};

export default ForgottenPassword;
