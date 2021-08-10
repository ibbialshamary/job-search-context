import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../layout/Button/Button";
import Modal from "../../layout/Modal/Modal";
import classes from "./ForgottenPassword.module.scss";

const ForgottenPassword = (props) => {
  // context
  const { hideModal } = useContext(AuthContext);

  return (
    <Modal>
      <div className="form-container">
        <strong>
          <h1>Password Reset</h1>
        </strong>
        <p>
          To reset your password, enter the email address you use to sign in to
          Buzzra
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="email-address">Email Address</label>
          <input type="email" />
          <Button>Send Reset Instructions</Button>
          <Button class="secondary" onClick={hideModal}>
            Go Back
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ForgottenPassword;
