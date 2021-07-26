import React from "react";
import Button from "../../layout/Button/Button";
import Modal from "../../layout/Modal/Modal";
import classes from "./ApplicationForm.module.scss";

const ApplicationForm = (props) => {
  return (
    <Modal onClose={props.onCloseApplicationFormModal}>
      <div className="form-container">
        <strong>
          <h1>Application Form</h1>
          <p>
            Since you don't have a profile set up, <br />
            please fill in all the required and some of the optional fields{" "}
            <span className="hot">*</span>
          </p>
        </strong>
        <p></p>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="use-nickname">Use a nickname?</label>
          <input id="use-nickname" type="text" placeholder="Ibbi" />
          <br />

          <label htmlFor="upload-cv">CV <span className="hot">*</span></label>
          <input id="upload-cv" type="file" className="no-resize" />
          <br />
          <br />

          <label htmlFor="cover-letter">Cover Letter</label>
          <textarea id="cover-letter" type="text" className="no-resize" />
          <br /><br />

          <label htmlFor="location">Location <span className="hot">*</span></label>
          <input id="location" type="text" className="no-resize" placeholder="Manchester" />
          <br /><br />

          <label htmlFor="third-party-urls">Third Party URLs</label>
          <input id="third-party-urls" type="text" className="no-resize" placeholder="https://github.com/mygithubprofile" />
          <br /><br />

          <Button>Submit Application</Button>
          <br />
          <Button class="secondary" onClick={props.onCloseApplicationFormModal}>
            Go Back
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ApplicationForm;
