import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

function Transaction() {
  const [rowData, setRowData] = useState([
    {
      message: "Falcon 9",
      timestamp: "2023-12-12T16:04:04",
      status:"SUCCESS",
      transactionType:"CREDIT",
      amount: "150",
    }
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "message", headerName: "Transaction Description", width:550 },
    { field: "timestamp", headerName: "Date" },
    { field: "status", headerName: "Status" },
    { field: "transactionType", headerName: "Transaction Type" },
    { field: "amount", headerName: "Amount (RS)" }
  ]);
  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Transactions
        </div>
      </div>
      <div className="ag-theme-quartz ml-6 mt-9" style={{ height: 780 }}>
        <AgGridReact className="bg-slate-200" rowData={rowData} columnDefs={colDefs} pagination={true} />
      </div>
    </div>
  );
}

export default Transaction;
