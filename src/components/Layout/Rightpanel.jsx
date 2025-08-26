import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Wallet from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import { useAuth } from "../../utils/AuthContext";
import Cashback from "../Cashback/Cashback";
import SignoutModal from "../Modal/SignoutModal";

function Rightpanel({ selectedButton }) {
  const { authenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  function handleSignout() {
    logout();
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case "operations":
        return <Wallet />;
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transaction />;
      case "cashbacks":
        return <Cashback />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <div className="w-9/12 bg-gray-400 shadow-xl p-4 rounded-lg relative">
        <div className="bg-black text-white px-3 py-3 h-max rounded-lg mr-5 flex justify-center w-24 absolute top-5 right-5">
          {authenticated && <button onClick={openModal}>Sign out</button>}
        </div>
        {renderContent()}
          <SignoutModal
            isOpen={showModal}
            onRequestClose={closeModal}
            handleSignout={handleSignout}
          />
      </div>
    </>
  );
}

export default Rightpanel;
