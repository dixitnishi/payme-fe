import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Wallet from "../Wallet/Wallet";
import Transaction from "../Transaction/Transaction";
import { useAuth } from "../../utils/AuthContext";
import Cashback from "../Cashback/Cashback";

function Rightpanel({ selectedButton }) {
  const { authenticated, logout } = useAuth();

  function handleSignout() {
    logout();
  }

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
          {authenticated && <button onClick={handleSignout}>Sign out</button>}
        </div>
        {renderContent()}
      </div>
    </>
  );
}

export default Rightpanel;
