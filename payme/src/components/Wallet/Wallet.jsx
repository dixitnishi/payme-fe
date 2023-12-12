import React from "react";
import Addmoney from "./Addmoney";
import Transfermoney from "./Transfermoney";

function Wallet() {
  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Wallet Operations
        </div>
      </div>
      <Addmoney/>
      <Transfermoney></Transfermoney>
    </div>
  );
}

export default Wallet;
