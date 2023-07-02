import React from "react";
import MOStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClick }) {
  return <div className={MOStyle.overlay} onClick={onClick} />;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
