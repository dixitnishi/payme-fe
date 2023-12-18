import React, { useRef, useState } from "react";
import { getAuthToken } from "../../utils/Auth";
import ErrorBox from "../Error/ErrorBox";
import { useNavigate } from "react-router-dom";

function Transfermoney() {
  const amount  = useRef();
  const receiverWalletId = useRef();
  const accountId = localStorage.getItem('accountId');
  const token = getAuthToken();

  const navigate = useNavigate();

  const [errorState,setErrorState] = useState(null);

  async function handleTransferMoney() {
    setErrorState(null);

    const enteredAmount = amount.current.value.trim();

    const receiverAccountId = receiverWalletId.current.value.trim();

    if(receiverAccountId.length<8 || receiverAccountId.length >8){
      setErrorState("Please enter a valid benificiary wallet id. Thanks!");
      return;
    }


    if (!enteredAmount) {
      setErrorState("Please enter a valid amount.");
      return;
    }

    const amountValue = parseFloat(enteredAmount);

    if (isNaN(amountValue) || !Number.isFinite(amountValue) || amountValue <= 0) {
      setErrorState("Please enter a valid amount value.");
      return;
    }

    try {
      const requestJson = {
        senderAccountNumber: accountId,
        receiverAccountNumber: receiverWalletId.current.value,
        amount: enteredAmount,
        transactionType: "DEBIT",
      };

      const response = await fetch("http://localhost:8080/transactions/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(requestJson),
      });
      const responseData = await response.json();
      if(response.ok){
        setErrorState("success")
      }
      else if(response.status === 401){
        navigate("/signin")
      }
      else{
        setErrorState(
          responseData.message || "An error occurred while adding money!"
        );
      }
      amount.current.value = "";
      receiverWalletId.current.value="";
    } catch (error) {
      setErrorState("Network error. Please try again later.")
    }
  }


  return (
    <div className="bg-slate-200 shadow-md mt-12 w-full p-16 rounded-lg">
      <form className="mt-8">
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
                ref={receiverWalletId}
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
                placeholder="Amount"
                ref={amount}
                id="amount"></input>
            </div>
          </div>
          <div className="bg-gray-400 flex justify-center w-40 font-medium hover:bg-slate-300 px-2 py-2 rounded-xl">
            <button type="button" onClick={handleTransferMoney}>Transfer Amount</button>
          </div>
          {errorState && <ErrorBox message={errorState}/>}
        </div>
      </form>
    </div>
  );
}

export default Transfermoney;
