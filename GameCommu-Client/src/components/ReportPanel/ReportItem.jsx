import { useFetchReportQuery } from "../../store";
import { useState } from "react";
import { Button, Pagination, } from "react-bootstrap";
import ReportModal from "./ReportModal";

export function ReportItem() {
  const { data, isFetching } = useFetchReportQuery();
  let content;
  const [modalShow, setModalShow] = useState(false);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages;

  const MapTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data?.slice(startIndex, endIndex);
    console.log(itemsToDisplay);
    content = itemsToDisplay?.map((item, id) => (
      <tr key={id}>
        <td>{id+1}</td>
        <td>{item.pid}</td>
        <td>{item.username}</td>
        <td>{item.reason}</td>
        <td>{item.status}</td>
        <td>
        <Button variant="success" onClick={() => setModalShow(true)}>
        View Post
      </Button>

      <ReportModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </td>
      </tr>
    ));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isFetching) {
    content = <td>Loading.......</td>;
  } else {
    totalPages = Math.ceil(data?.length / itemsPerPage);
    MapTable();
  }

  return (
    <div>
      <div className="tableContent-con table-responsive ">
        <table
          responsive="lg"
          id="t1"
          className="table table-stiped"
          style={{ width: "100%" }}
          
        >
          <thead>
            <tr>
              <th>No.</th>
              <th>Post</th>
              <th>Report By</th>
              <th>Desc</th>
              <th>Status</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
      <div className="indexTable-con">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => {
            return (
              i + 1 === currentPage && (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              )
            );
          })}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
}
