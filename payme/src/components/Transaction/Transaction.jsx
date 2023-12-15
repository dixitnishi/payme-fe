import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

function Transaction() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          "http://localhost:8080/transactions/get/10000002",
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );
        const responseData = await response.json();

        // here is where i can alter the mapping but to confirm whether is a best practice ?
        setRowData(responseData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTransactions();
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "description", headerName: "Transaction Description", width:720},
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
      <div>
        <div>
          Refresh
        </div>
        <div>
          Download
        </div>
      </div>
      <div className="ag-theme-quartz ml-6 mt-9" style={{ height: 780 }}>
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
