import React from "react";
import "./AdminPage.css";
import { MDBDataTable } from "mdbreact";

const item = {
  columns: [
    {
      label: "name",
      field: "name",
      width: 150,
    },
    {
      label: "age",
      field: "age",
      width: 150,
    },
  ],
  rows: [
    {
      name: "a",
      age: 11,
    },
    {
      name: "b",
      age: 12,
    },
  ],
};
export function TablePages() {
  const MapTable = () => {
    return item.map((item, id) => {
      return (
        <tr>
          <td >{id}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
        </tr>
      );
    });
  };

  return (
    <div className="AdminPageContent-con">
      <div className="AdminPageMain-con m-5">
        <div className="AdminPageHead-con">
          <span className="fs-1">Report</span>
          <div className="PageHeadButton-con ">
          <button
              className="btn bordor-none dropdown-toggle text-white text-center text-sm-start border-top-color "
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
            </button>
            <div className=" dropdown-menu " aria-labelledby="triggerId">
              <a >
                Remove
              </a>
            </div>
          </div>
        </div>
        <div>
          <MDBDataTable striped bordered  responsive  data={item} className="customTable"/>
        </div>
      </div>
    </div>
  );
}

export default TablePages;
