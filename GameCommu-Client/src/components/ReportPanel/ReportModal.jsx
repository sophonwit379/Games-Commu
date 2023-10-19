import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useFetchPostByIdQuery, useRemovePostMutation } from "../../store";

function ReportModal(props) {
  const { data, isFetching } = useFetchPostByIdQuery(props.data);
  const [removePost] = useRemovePostMutation();
  const removeHandle=(pid)=>{
    removePost(pid);
    toast.success("ลบสำเร็จ", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
    });
  }

  if (!isFetching) {
    console.log(data);
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen="true"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Post Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            pid:{data.pid}
            <br/>gid:{data.gid}
            <br/>uid:{data.uid}
            <br/>detail:{data.detail}
            <br/>date:{data.date}
            <br/><Button onClick={()=>{
              removeHandle(data.pid);
            }}>remove</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ReportModal;
