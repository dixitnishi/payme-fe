import React, { useRef, useState } from "react";
import { getAuthToken } from "../../utils/Auth";
import ErrorBox from "../Error/ErrorBox";
import { useNavigate } from "react-router-dom";

function Addmoney() {

  const [errorState,setErrorState] = useState(null);
  const amount = useRef();
  const token = getAuthToken();
  const navigate = useNavigate();
  

  const accountId = localStorage.getItem("accountId");

  async function handleAddMoney() {
    setErrorState(null);

    const enteredAmount = amount.current.value.trim();

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
        receiverAccountNumber: "",
        amount: enteredAmount,
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

      const responseData = await response.json();
      if (response.status === 200) {
        console.log(responseData)
        setErrorState("Success, "+responseData.description);
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
    } catch (error) {
      setErrorState("Network error. Please try again later.")
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
          {errorState && <ErrorBox message={errorState}/>}
        </div>
      </form>
    </div>
  );
}

export default Addmoney;
