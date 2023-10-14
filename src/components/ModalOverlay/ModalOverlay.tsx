import MOStyle from "./ModalOverlay.module.css";
import { FC } from "react";

interface IModalOverlayProp {
  onClick: () => void;
}
const ModalOverlay: FC<IModalOverlayProp> = ({ onClick }) => {
  return <div className={MOStyle.overlay} onClick={onClick} />;
}

export default ModalOverlay;
