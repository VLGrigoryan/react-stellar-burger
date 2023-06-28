import React from "react";
import MOStyle from "./ModalOverlay.module.css";
import { ModalOverlayPropTypes } from "../../utils/prop-types";

function ModalOverlay({ onClick }) {
  return <div className={MOStyle.overlay} onClick={onClick} />;
}

ModalOverlay.propTypes = ModalOverlayPropTypes;

export default ModalOverlay;
