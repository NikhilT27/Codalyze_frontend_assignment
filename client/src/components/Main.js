import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Main = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    {
      id: "Toyota",
      name: "Celica",
      email: 35000,
      gender: "Male",
      dob: "12",
      country: "India",
      city: "Nagpur",
    },
    {
      id: "Ford",
      name: "Mondeo",
      email: 32000,
      gender: "Male",
      dob: "12",
      country: "India",
      city: "Nagpur",
    },
    {
      id: "Porsche",
      name: "Boxter",
      email: 72000,
      gender: "Male",
      dob: "12",
      country: "India",
      city: "Nagpur",
    },
  ]);

  const columnDefs = [
    {
      headerName: "Id",
      field: "id",
      editable: true,
      singleClickEdit: true,
      checkboxSelection: true,
    },
    {
      headerName: "Name",
      field: "name",
      editable: true,
      singleClickEdit: true,
    },
    {
      headerName: "Email",
      field: "email",
      editable: true,
      singleClickEdit: true,
    },
    {
      headerName: "Gender",
      field: "gender",
      singleClickEdit: true,
      cellRenderer: "genderRenderer",
    },
    {
      headerName: "DOB",
      field: "dob",
      editable: true,
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

  const onButtonClick = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    console.log(selectedNodes);
    const selectedData = selectedNodes.map((node) => node.data);
    console.log(selectedData);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.id + " " + node.name + " " + node.gender)
      .join(", ");
    alert(`Selected node ${selectedDataStringPresentation}`);
  };

  const GenderRenderer = (prpps) => {
    const [gender, setGender] = useState("Female");

    const onGenderChange = (event) => {
      setGender(event.target.value);
    };

    return (
      <div>
        <select value={gender} onChange={onGenderChange}>
          <option value="Male"> Male </option>
          <option value="Female"> Female </option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <div className="ag-theme-alpine main-table-size">
        <button onClick={() => onButtonClick()}>BUTTON_SELECTED</button>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          frameworkComponents={{
            genderRenderer: GenderRenderer,
          }}
          onGridReady={(params) => {
            setGridApi(params.api);
            setGridColumnApi(params.columnApi);
          }}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Main;
