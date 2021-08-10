import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import classes from "./Modal.module.scss";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = () => {
  const { hideModal, modalIsVisible } = useContext(AuthContext);

  return (
    <>
      {modalIsVisible && (
        <div className={classes.backdrop} onClick={hideModal} />
      )}
    </>
  );
};

const ModalOverlay = (props) => {
  // context
  const { modalIsVisible } = useContext(AuthContext);

  return (
    <>
      {modalIsVisible && (
        <div className={classes.modal}>
          <div className={classes.content}>{props.children}</div>
        </div>
      )}
    </>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
