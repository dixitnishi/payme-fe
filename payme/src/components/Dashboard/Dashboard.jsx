import {React,useEffect, useState} from "react";
import { getAuthToken } from "../../utils/Auth";

function Dashboard() {
  const token = getAuthToken();
  const [data,setData] = useState({}); 

  useEffect(() => {
    async function fetchAccountDetails() {
      try {
        const response = await fetch(
          `http://localhost:8080/account/get/${localStorage.getItem('accountId')}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:"Bearer "+token
            },
          }
        );
        const responseBody  = await response.json();
        const dataToBeShown = {
          nameholder: responseBody.name,
          accountId: responseBody.accountNo,
          balance: responseBody.balance
        }
        setData(dataToBeShown);
      } catch (error) {
        console.log(error)
      }
    }
    fetchAccountDetails();
  }, []);


  return (
    <>
      <div className="flex justify-between p-2">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Dashboard
        </div>
      </div>
      <div className="bg-slate-200 shadow-md mt-12 w-full p-16 rounded-lg">
        <h2 className="text-2xl font-bold leading-tight text-black">
          Account Details
        </h2>
        <div className="">
          <p>Full name : {data.nameholder}</p>
          <p>Account number : {data.accountId}</p>
          <p>Balance : {data.balance}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
