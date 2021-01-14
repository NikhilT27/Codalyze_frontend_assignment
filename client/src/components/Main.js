import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { city } from "../util/cities";
import deleteIconPng from "../image/trash.png";
import Submited from "./Submited";
import { GridApi } from "ag-grid-community";

const Main = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [submitData, setSubmitData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [deleteSelectedRowClicked, setDeleteSelectedRowClicked] = useState(
    false
  );
  const [addRowClicked, setAddRowClicked] = useState(false);
  const [newRow, setNewRow] = useState([]);
  const [isError, setIsError] = useState(false);
  const [rowData, setRowData] = useState([
    {
      id: "Toyota",
      name: "Celica",
      email: "abc@gmail.com",
      gender: "Male",
      dob: "12-01-2020",
      country: "India",
      city: "Nagpur",
    },
    {
      id: "Ford",
      name: "Mondeo",
      email: "abc@gmail.com",
      gender: "Male",
      dob: "12-01-2020",
      country: "India",
      city: "Nagpur",
    },
    {
      id: "Porsche",
      name: "Boxter",
      email: "abc@gmail.com",
      gender: "Male",
      dob: "12-01-2020",
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
      cellStyle: checkEmpty,
    },
    {
      headerName: "Name",
      field: "name",
      editable: true,
      singleClickEdit: true,
      cellStyle: function (params) {
        if (params.value === "") {
          return { backgroundColor: "white" };
        } else if (params.value.length <= 2) {
          return { backgroundColor: "yellow" };
        } else {
          return { backgroundColor: "white" };
        }
      },
    },
    {
      headerName: "Email",
      field: "email",
      editable: true,
      singleClickEdit: true,
      cellStyle: function (params) {
        if (params.value == "") {
          return { backgroundColor: "yellow" };
        }
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            params.value
          )
        ) {
          return { backgroundColor: "white" };
        }
        // checkMailRegex(params);

        return { backgroundColor: "yellow" };
      },
    },
    {
      headerName: "Gender",
      field: "gender",
      singleClickEdit: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Male", "Female"],
      },
    },
    {
      headerName: "DOB",
      field: "dob",
      editable: true,
      browserDatePicker: true,
    },
    {
      headerName: "Country",
      field: "country",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: Object.keys(city),
      },
    },
    {
      headerName: "City",
      field: "city",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: function (params) {
        return {
          values: city[params.node.data.country],
        };
      },
    },
    {
      headerName: "",
      field: "delete",
      editable: false,
      cellRenderer: "deleteIcon",
    },
  ];

  const defaultColDef = {
    editable: true,
    singleClickEdit: true,
    width: 180,
    minWidth: 50,
    maxWidth: 300,
    resizable: true,
    autoHeight: true,
    flex: true,
    cellStyle: { textAlign: "left" },
  };

  function checkEmpty(params) {
    if (params.value !== "") {
      return { backgroundColor: "white" };
    } else {
      return { backgroundColor: "red" };
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("refreshRowData") != null) {
      let data = JSON.parse(sessionStorage.getItem("refreshRowData"));
      let str1 = JSON.stringify(data);
      let str2 = JSON.stringify(rowData);
      if (str1.localeCompare(str2) != 0) {
        // dispatch(addByRowData(data));
        setRowData(data);
      }
    } else {
      sessionStorage.setItem("refreshRowData", JSON.stringify(rowData));
    }
    return () => {
      // localStorage.removeItem("submitedData");
    };
  });

  const onAddRowClick = () => {
    let newItem = {
      id: "Porsche",
      name: "Boxter",
      email: "aa@mail.com",
      gender: "Male",
      dob: "12-01-2020",
      country: "India",
      city: "Nagpur",
    };

    let res = gridApi.applyTransaction({
      add: [newItem],
      addIndex: -1,
    });
    let allData = [...rowData];
    allData.push(newItem);
    console.log(allData);
  };

  const onDeleteNonSelectedRowsClick = () => {
    let selectedData = gridApi.getSelectedRows();

    gridApi.selectAll();
    let allData = gridApi.getSelectedRows();
    gridApi.deselectAll();
    let deleteData = [];
    allData.forEach((data) => {
      selectedData.forEach((selectData) => {
        if (data.id !== selectData.id) {
          deleteData.push(data);
        }
      });
    });
    let res = gridApi.applyTransaction({ remove: deleteData });
  };

  const onDeleteSelectedRowsClick = () => {
    var selectedData = gridApi.getSelectedRows();

    console.log(selectedData);
    let res = gridApi.applyTransaction({ remove: selectedData });
  };

  const onSubmitClick = () => {
    setSubmitClicked(!submitClicked);
    gridApi.selectAll();
    let data = gridApi.getSelectedRows();
    gridApi.deselectAll();
    sessionStorage.setItem("refreshRowData", JSON.stringify(data));
    sessionStorage.setItem("refreshSubmitData", JSON.stringify(data));
    alert("Submit");
    // window.location.reload();
  };

  const NameRenderer = (props) => {
    const [name, setName] = useState();
    const [warning, setWarning] = useState(false);

    const onNameChange = (e) => {
      if (e.target.value.length < 3) {
        setWarning(true);
      } else {
        setWarning(false);
        setName(name);
      }
    };

    return (
      <div className={warning ? "warning-style" : ""}>
        <input type="text" onChange={(e) => onNameChange(e)} placeholder="Name">
          {name}
        </input>
      </div>
    );
  };

  function deleteIcon(params) {
    const deleteData = () => {
      console.log(params.node.data.name);
      let res = params.api.applyTransaction({ remove: [params.node.data] });
    };

    return (
      <div className="delete-button-box">
        <button className="delete-button" onClick={() => deleteData()}>
          <img style={{ width: 20, height: 20 }} src={deleteIconPng} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="ag-theme-alpine main-table-size">
        <div className="button-box">
          <div className="button">
            <button onClick={() => onAddRowClick()}>Add Row</button>
          </div>
          <div className="button">
            <button onClick={() => onDeleteSelectedRowsClick()}>
              Delete Selected Rows
            </button>
          </div>
          <div className="button">
            <button onClick={() => onDeleteNonSelectedRowsClick()}>
              Delete Non Selected Rows
            </button>
          </div>
          <div className="button">
            <button onClick={() => onSubmitClick()}>Submit</button>
          </div>
        </div>
        <AgGridReact
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection="multiple"
          frameworkComponents={{
            nameRenderer: NameRenderer,
            deleteIcon: deleteIcon,
          }}
          onGridReady={(params) => {
            setGridApi(params.api);
            setGridColumnApi(params.columnApi);
          }}
        ></AgGridReact>
      </div>
      {rowData != [] ? <Submited props={rowData} /> : <div>None</div>}
    </div>
  );
};

export default Main;
