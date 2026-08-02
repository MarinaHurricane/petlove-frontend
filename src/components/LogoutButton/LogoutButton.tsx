import { useState } from "react";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { ModalApproveAction } from "../ModalApproveAction/ModalApproveAction";

export const LogoutButton = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  return (
    <>
      <Button onClick={openLogoutModal}>LOG OUT</Button>
      {isLogoutModalOpen && (
        <Modal onClose={closeLogoutModal}>
          <ModalApproveAction onClose={closeLogoutModal} />
        </Modal>
      )}
    </>
  );
};
