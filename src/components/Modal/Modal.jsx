import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { ModalPropTypes } from '../../utils/prop-types.js';
import MStyle from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

function Modal({ title, onClose, children }) {
  React.useEffect(() => {
    const handleEscKeydown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={MStyle.modal}>
        <div className={`${MStyle.container} mt-10 ml-10`}>
          {title && <h3 className="text text_type_main-large">{title}</h3>}
        </div>
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

Modal.propTypes = ModalPropTypes;

export default Modal;