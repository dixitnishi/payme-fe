import React, { useState } from "react";
import Addmoney from "./Addmoney";
import Transfermoney from "./Transfermoney";

function Wallet() {
  const [selectedButton, setSelectedButton] = useState("addmoney");
  // const [addMoneyIsActive, setAddMoneyIsActive] = useState(true);
  // const [transferMoneyIsActive, setTransferMoneyIsActive] = useState(false);

  const addMoneyButtonStyle =
    "rounded-md bg-slate-200 mt-6 ml-6 px-8 py-2 text-sm font-semibold text-black hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
  const transferMoneyButtonStyle =
    "rounded-md bg-slate-200 ml-5 px-8 py-2 text-sm font-semibold hover:bg-slate-300 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
  // const addMoneyButtonStyleActive =
  //   "rounded-md bg-slate-300 mt-6 ml-6 px-8 py-2 text-sm font-semibold text-black hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
  // const transferMoneyButtonStyleActive =
  //   "rounded-md bg-slate-300 ml-5 px-8 py-2 text-sm font-semibold hover:bg-slate-300 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  const renderContent = () => {
    switch (selectedButton) {
      case "addmoney":
        return <Addmoney />;
      case "transfermoney":
        return <Transfermoney />;
      default:
        return <Addmoney />;
    }
  };

  const handleSelectButton = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Wallet Operations
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleSelectButton("addmoney")}
        className={
          addMoneyButtonStyle
        }>
        Add Amount
      </button>
      <button
        type="button"
        onClick={() => handleSelectButton("transfermoney")}
        className={
          transferMoneyButtonStyle
        }>
        Transfer Amount
      </button>
      {renderContent()}
    </div>
  );
}

export default Wallet;
