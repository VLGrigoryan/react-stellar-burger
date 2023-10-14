import { FC, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import MStyle from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalsContainer = document.querySelector("#modals") as Element;

interface IModalProp {
  title?: string;
  number?: number;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<IModalProp> = ({ title, onClose, children, number }) => {
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={MStyle.modal}>
        <div className={`${MStyle.container} mt-10 ml-10`}>
          {title && <h3 className="text text_type_main-large">{title}</h3>}
        </div>
        {number && <h3 className={`${MStyle.number} text text_type_digits-default`}>#{number}</h3>}
        {children}
        <button className={MStyle.close} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}

export default Modal;
