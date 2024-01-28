import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { MdOutlineRefresh } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { getAuthToken } from "../../utils/Auth";
import ErrorBox from "../Error/ErrorBox";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const [rowData, setRowData] = useState([]);
  const token = getAuthToken();
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTransactions() {
      setErrorState(null);
      try {
        const response = await fetch(
          `http://localhost:8080/transactions/get/${localStorage.getItem(
            "accountId"
          )}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const responseData = await response.json();
        if (response.ok) {
          setRowData(responseData);
        } else if (response.status === 401) {
          console.log("inside else before nav");
          navigate("/signin");
        }
      } catch (error) {
        setErrorState("Network error. Please try again later.");
      }
    }
    fetchTransactions();
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "description", headerName: "Transaction Description", width: 720 },
    {
      field: "transactionTime",
      headerName: "Date",
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      cellStyle: (params) => {
        const transactionType = params.data.transactionType;
        if (transactionType === "CREDIT") {
          return { color: "green", fontWeight: "bold" };
        } else if (transactionType === "DEBIT") {
          return { color: "red", fontWeight: "bold" };
        } else {
          return { color: "black" };
        }
      },
    },
    { field: "amount", headerName: "Amount (RS)" },
  ]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Transactions
        </div>
      </div>
      {errorState && <ErrorBox message={errorState} />}
      <div className="ag-theme-quartz ml-6 mt-9" style={{ height: 600 }}>
        <AgGridReact
          id="ag-row"
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
