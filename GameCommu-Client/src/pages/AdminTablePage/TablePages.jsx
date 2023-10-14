import { ReportItem } from "../../components/ReportPanel/ReportItem";
import "./TableStyle.css";
import {RequestItem} from "../../components/ReportPanel/RequestItem"

export function TablePages(props) {
  console.log(props);
  if (props.props === "report") {
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
            <ReportItem />
          </div>
        </div>
      </div>
    );
  }else if(props.props === "request"){
    return (
      <div className="AdminPageContent-con">
        <div className="AdminPageMain-con m-5">
          <div className="AdminPageHead-con">
            <span className="fs-1">Request</span>
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
            <RequestItem />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default TablePages;
