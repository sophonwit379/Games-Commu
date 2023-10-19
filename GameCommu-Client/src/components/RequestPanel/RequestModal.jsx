import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import RequestAddItem from "./RequestAddItem";
import { useRejectRequestMutation } from "../../store";

export function RequestModal(props) {
    const [reject ] = useRejectRequestMutation();
    const handleClick = () => {
      const rdata = {
        rgid: props.data.rgid,
        name: props.data.name,
        year: props.data.year,
      };
      console.log(rdata);
      reject(rdata)
        .then(() => {
          console.log(reject);
          toast.success("Rejected", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Rejection failed:", error);
        });
    };
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
            View
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequestAddItem data={props.data}/>
          <Button onClick={handleClick}>Reject</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default RequestModal;
