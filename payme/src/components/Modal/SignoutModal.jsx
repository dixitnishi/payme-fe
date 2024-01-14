import React from "react";
import Modal from "react-modal";
import styles from "./modal.module.css";

Modal.setAppElement("#root"); // Set the root element for accessibility

function SignoutModal({ isOpen, onRequestClose, handleSignout }) {
  return (
    <Modal
      className="bg-slate-300 rounded-lg h-32 px-8 py-2 text-2xl"
      overlayClassName={styles.overlay}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signout Modal"
    >
      <div className="p-4">
        <h2>Are you sure you want to sign out?</h2>
        <div className="flex justify-end mt-6 gap-4">
          <button
            className="px-4 hover:bg-slate-400 rounded-xl w-28"
            onClick={onRequestClose}
          >
            No
          </button>
          <button
            className="px-4 bg-slate-400 rounded-lg w-28 hover:bg-slate-500 shadow-sm"
            onClick={handleSignout}
          >
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SignoutModal;
