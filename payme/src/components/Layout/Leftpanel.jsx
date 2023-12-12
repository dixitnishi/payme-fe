import React from "react";
import logo from "../../static/Logo.png"

function Leftpanel() {
  return (
    <div className="bg-gray-400 ml-7 w-96 shadow-xl mr-5 p-2 rounded-lg">
      <div className="flex text-4xl font-bold leading-tight text-black p-4">
        <img src={logo} alt="" className="w-14 mr-9"/>
        <h1>Payme</h1>
      </div>
      <div className="flex justify-center font-semibold bg-gray-200 m-2 hover:bg-slate-300 cursor-pointer">
        Dashboard
      </div>
      <div className="flex justify-center font-semibold bg-gray-200 m-2 hover:bg-slate-300 cursor-pointer">
        Wallet Operations
      </div>
      <div className="flex justify-center font-semibold bg-gray-200 m-2 hover:bg-slate-300 cursor-pointer">
        Transactions
      </div>
      <div className="flex justify-center font-semibold bg-gray-200 m-2 hover:bg-slate-300 cursor-pointer">
        Settings
      </div>
    </div>
  );
}

export default Leftpanel;
