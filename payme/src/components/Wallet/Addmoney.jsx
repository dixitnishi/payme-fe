import React, { useRef } from "react";
import { getAuthToken } from "../../utils/Auth";

function Addmoney() {
  const amount = useRef();
  const token = getAuthToken();

  const accountId = localStorage.getItem("accountId");

  async function handleAddMoney() {
    try {
      const requestJson = {
        senderAccountNumber: accountId,
        receiverAccountNumber: "",
        amount: amount.current.value,
        transactionType: "CREDIT",
      };
      console.log(requestJson);

      const response = await fetch("http://localhost:8080/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(requestJson)
      });
      if (response) {
        console.log("Money added successfully");
      }
      amount.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-200 mt-12 w-full px-12 py-8 rounded-lg">
      <form className="mt-8">
        <div className="space-y-8">
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
                type="text"
                ref={amount}
                placeholder="Amount"
                id="amount"></input>
            </div>
          </div>
          <div className="bg-gray-400 flex justify-center hover:bg-slate-300 font-medium w-40 px-2 py-2 rounded-xl">
            <button type="button" onClick={handleAddMoney}>
              Add Amount
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Addmoney;
