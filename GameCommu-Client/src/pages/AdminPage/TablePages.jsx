import "./AdminPage.css";
import { Button, Pagination } from "react-bootstrap";
import { useState } from "react";
import "./TableStyle.css";

const item = [
  {
    name: "a",
    topic: "TESTA",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  ,
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  ,
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  ,
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  ,
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
  ,
  {
    name: "b",
    topic: "TESTB",
  },
  {
    name: "b",
    topic: "TESTB",
  },
];

export function TablePages() {
  const itemsPerPage = 2; // You can adjust this to the number of items per page you want
  const totalPages = Math.ceil(item.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const MapTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = item.slice(startIndex, endIndex);
    return itemsToDisplay.map((item, id) => {
      return (
        <tr key={id}>
          <td>{id + 1}</td>
          <td>{item.name}</td>
          <td>{item.topic}</td>
          <td>
            <Button variant="success">Accept</Button>
          </td>
          <td>
            <Button variant="danger">Reject</Button>
          </td>
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
            ></button>
            <div className=" dropdown-menu " aria-labelledby="triggerId">
              <a>Remove</a>
            </div>
          </div>
        </div>
        <div className="table-con">
          <div className="tableContent-con table-responsive ">
            <table
              responsive="lg"
              id="t1"
              className="table table-stiped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Topic</th>
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                <MapTable />
              </tbody>
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
      </div>
    </div>
  );
}

export default TablePages;
