import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Modal = ({ modalActive, setModalActive, text, auth }) => {
  return (
    <div
      className={modalActive ? "modal__wrapper" : "modal__wrapper_none"}
      onClick={() => setModalActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <p>{text}</p>
        {auth ? (
          <Link to="/userList">
            <button
              onClick={() => {
                setModalActive(false);
              }}
            >
              OK
            </button>
          </Link>
        ) : (
          <Link to="/auth">
            <button
              onClick={() => {
                setModalActive(false);
              }}
            >
              OK
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Modal;
