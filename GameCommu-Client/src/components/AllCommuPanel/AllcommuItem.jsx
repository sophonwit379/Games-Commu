import { React, useState } from "react";
import { useGetGamesQuery } from "../../store";
import { Button, Pagination } from "react-bootstrap";

function AllcommuItem() {
  const { data, isFetching } = useGetGamesQuery();
  console.log(data);
  let content;
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages;
  const DeleteHandle=()=>{

  }
  const UpdateHandle=()=>{
    
  }

  const MapTable = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = data?.slice(startIndex, endIndex);
    console.log(itemsToDisplay);
    content = itemsToDisplay?.map((item, id) => (
      <tr key={id}>
        <td>{item.gid}</td>
        <td>{item.name}</td>
        <td>{item.year}</td>
        <td>
          <Button variant="success" onClick={()=>{
            UpdateHandle();
          }}>
            Update
          </Button>
        </td>
        <td>
          <Button variant="success" onClick={()=>{
            DeleteHandle();
          }}>
            Delete
          </Button>
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
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Update</th>
              <th>Delete</th>
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

export default AllcommuItem;
