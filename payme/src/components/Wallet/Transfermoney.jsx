import React from "react";

function Transfermoney() {
  return (
    <div className="bg-slate-200 shadow-md mt-12 w-full p-16 rounded-lg">
      <form action="#" method="POST" className="mt-8">
        <div className="space-y-8">
          <div>
            <label
              htmlFor="accountId"
              className="text-base font-medium text-gray-900">
              {" "}
              Benificiary Wallet Id / Acc. Id{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Account Id"
                id="accountId"></input>
            </div>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="text-base font-medium text-gray-900">
              {" "}
              Amount{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Amount"
                id="amount"></input>
            </div>
          </div>
          <div className="bg-gray-400 flex justify-center w-40 font-medium hover:bg-slate-300 px-2 py-2 rounded-xl">
            <button>Transfer Amount</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Transfermoney;
