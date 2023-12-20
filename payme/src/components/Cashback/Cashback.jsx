import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { MdOutlineRefresh } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { getAuthToken } from "../../utils/Auth";
import ErrorBox from "../Error/ErrorBox";
import { useNavigate } from "react-router-dom";

function Cashback() {
  const [rowData, setRowData] = useState([]);
  const token = getAuthToken();
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCashbacks() {
      setErrorState(null);
      try {
        const response = await fetch(
          `http://localhost:8080/transactions/cashback/${localStorage.getItem(
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
          navigate("/signin");
        }
      } catch (error) {
        setErrorState("Network error. Please try again later.");
      }
    }
    fetchCashbacks();
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState([
    { field: "description", headerName: "Cashback Description", width: 720 },
    { field: "CashbackTime", headerName: "Date" },
    { field: "cashbackAmount", headerName: "Amount (RS)" },
  ]);

  return (
    <div>
      <div className="w-9/12 bg-gray-400 p-4 rounded-lg flex justify-between">
        <div className="text-4xl font-bold leading-tight text-black p-2">
          Cashbacks
        </div>
      </div>
      {errorState && <ErrorBox message={errorState} />}
      {!errorState && (
        <div className="flex justify-end mr-20">
          <div className="mr-4">
            <MdOutlineRefresh size={30} />
          </div>
          <div>
            <FaFileDownload size={30} />
          </div>
        </div>
      )}

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

export default Cashback;
