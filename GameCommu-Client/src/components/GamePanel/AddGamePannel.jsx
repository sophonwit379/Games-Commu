import { Modal } from "react-bootstrap";

function AddGame(props) {
  return (
    <Modal  
      {...props}
      centered
      scrollable
    >
      <Modal.Header>
          รายชื่อเกม
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  )
}

export default AddGame;