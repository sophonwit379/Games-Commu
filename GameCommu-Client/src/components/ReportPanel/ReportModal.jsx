/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import {PostViewItem} from '../AdminPostViewPanel/PostViewItem'

function ReportModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen='true'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostViewItem props={props}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReportModal