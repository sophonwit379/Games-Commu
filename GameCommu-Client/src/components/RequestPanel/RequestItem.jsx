import { useFetchRequestQuery,useRejectRequestMutation } from "../../store";
import { useState, React } from "react";
import { Button, Pagination } from "react-bootstrap";
import "../../pages/AdminTablePage/TableStyle.css";
import { RequestModal } from "./RequestModal";

export function RequestItem() {
  const { data, isFetching } = useFetchRequestQuery();
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
        <td>{item.rgid}</td>
        <td>{item.name}</td>
        <td>{item.year}</td>
        <td>{item.status}</td>
        <td>
          <Button
            variant="success"
            onClick={() => setModalShow(true)}
          >
            Add
          </Button>
          <RequestModal show={modalShow} onHide={() => setModalShow(false)} data={item} />
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
              <th>Game</th>
              <th className="w-30">Year</th>
              <th>Status</th>
              <th>Add</th>
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

export default RequestItem;
