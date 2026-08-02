import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";
import { Icon } from "../Icon/Icon";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon name="icon-cross-small" className={css.icon} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
