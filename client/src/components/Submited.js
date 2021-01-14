import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Submited() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("refreshSubmitData") != null) {
      let data = JSON.parse(sessionStorage.getItem("refreshSubmitData"));
      setRowData(data);
    }
    return () => {};
  });

  useEffect(() => {
    if (localStorage.getItem("submitedData") != null) {
      let data = localStorage.getItem("submitedData");
      setRowData(JSON.parse(data));
    }
    return () => {};
  }, [rowData]);

  function updateRows() {
    console.log(rowData);
  }
  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Gender",
      field: "gender",
    },
    {
      headerName: "DOB",
      field: "dob",
    },
    {
      headerName: "Country",
      field: "country",
    },
    {
      headerName: "City",
      field: "city",
    },
  ];

  return (
    <div className="ag-theme-alpine main-table-size">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={(params) => {
          setGridApi(params.api);
          setGridColumnApi(params.columnApi);
        }}
      ></AgGridReact>
    </div>
  );
}

export default Submited;
