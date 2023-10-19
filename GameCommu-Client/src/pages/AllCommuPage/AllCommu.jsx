import "../AdminTablePage/TableStyle.css";
import AllcommuItem from "../../components/AllCommuPanel/AllcommuItem";

export function AllCommu(props) {
  console.log(props);
  return (
    <div className="AdminPageContent-con">
      <div className="AdminPageMain-con m-5">
        <div className="AdminPageHead-con">
          <span className="fs-1">Community</span>
        </div>
        <div className="table-con">
          <AllcommuItem/>
        </div>
      </div>
    </div>
  );
  return null;
}

export default AllCommu;
