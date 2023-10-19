import { ReportItem } from "../../components/ReportPanel/ReportItem";
import "./TableStyle.css";
import {RequestItem} from "../../components/RequestPanel/RequestItem"

export function TablePages(props) {
  console.log(props);
  if (props.props === "report") {
    return (
      <div className="AdminPageContent-con">
        <div className="AdminPageMain-con m-5">
          <div className="AdminPageHead-con">
            <span className="fs-1">Report</span>
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
