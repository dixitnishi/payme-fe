import {React,useEffect} from "react";
import { getAuthToken } from "../../utils/Auth";

function Dashboard() {
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
          <p>
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
