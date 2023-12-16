import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { MdOutlineRefresh } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { getAuthToken } from "../../utils/Auth";
import axios from 'axios'

function Transaction() {
  const [rowData, setRowData] = useState([]);
  const accountNumber = 1000002;
  const token = getAuthToken();

  async function getTransactions() {
    const response  = await axios.get("http://localhost:8080/transactions/get/100000002");
    console.log(await response.json());
  }
  getTransactions();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "description", headerName: "Transaction Description", width: 720 },
    { field: "transactionTime", headerName: "Date" },
    { field: "transactionType", headerName: "Transaction Type" },
    { field: "amount", headerName: "Amount (RS)" },
  ]);

  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Transactions
        </div>
      </div>
      <div className="flex justify-end mr-20">
        {/* To do - Onclick events to be applied here after the 
        integration is completed for download and making and api request  */}
        <div className="mr-4">
          <MdOutlineRefresh size={30} />
        </div>
        <div>
          <FaFileDownload size={30} />
        </div>
      </div>
      <div className="ag-theme-quartz ml-6 mt-9" style={{ height: 600 }}>
        <AgGridReact
          className="bg-slate-200"
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
        />
      </div>
    </div>
  );
}

export default Transaction;
