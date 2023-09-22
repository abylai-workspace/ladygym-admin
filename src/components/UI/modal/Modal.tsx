import React from "react";
import ReactDom from "react-dom";
import { useTranslation } from "react-i18next";
import classes from "./Modal.module.scss";
import Card from "../card/Card";
import Button from "../button/Button";
import { Icon } from "@iconify/react";

interface IBackdrop {
  onConfirm: () => void;
}
const Backdrop: React.FC<IBackdrop> = (props) => {
  return <div className={classes.backdrop} onClick={props?.onConfirm}></div>;
};

// interface IModalOverlay {
//   title: string;
//   message: string;
// }

interface IModal {
  title: string;
  onClose: () => void;
}

const ModalOverlay: React.FC<IModal> = (props) => {
  const { t } = useTranslation();

  return (
    <Card>
      <div className={classes.modal}>
        <header className={classes.header}>
          <h3>{props.title}</h3>
          
          <div onClick={props.onClose}><Icon icon="material-symbols:close" width="24" color="white"/></div>
        </header>
        <div className={classes.content}>
          <p>{props.children}</p>
        </div>
       
      </div>
    </Card>
  );
};

const Modal: React.FC<IModal> = (props) => {
  const backdropRoot = document.getElementById("backdrop-root") as HTMLElement;
  const modalOverlay = document.getElementById("overlay-root") as HTMLElement;
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onClose} />,
        backdropRoot
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          title={props.title}
          onClose={props.onClose}
          children={props.children}
        />,
        modalOverlay
      )}
    </>
  );
};

export default Modal;
