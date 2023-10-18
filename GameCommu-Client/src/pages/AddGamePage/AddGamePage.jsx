import { React } from "react";
import "../AdminPage/AdminPage.css";
import AddGameItem from "../../components/AddGamePanel/AddGameItem";

export function AddGamePage() {
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
            ></button>
            <div className=" dropdown-menu " aria-labelledby="triggerId">
              <a>Remove</a>
            </div>
          </div>
        </div>
        <div className="table-con">
          <AddGameItem/>
        </div>
      </div>
    </div>
  );
}

export default AddGamePage;
