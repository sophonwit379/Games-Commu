import { Container,Accordion, Button,Modal } from "react-bootstrap";
import './GamePanel.css'
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import AddGamePanel from './AddGamePannel';
import GameItems from "./GameItems";

function GamePanel() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container fluid className="p-0 pb-2 rounded" id='main'>
            <Accordion className="p-0 border-0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="border-0">5 อันดับกลุ่มเกมยอดนิยม</Accordion.Header>
                    <Accordion.Body>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="p-0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>กลุ่มของคุณ</Accordion.Header>
                    <Accordion.Body>
                        <GameItems/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Button 
                id="add-bt" 
                variant="outline-secondary" 
                className="w-100 d-flex flex-row align-items-center"
                onClick={()=>setModalShow(true)}
            >
                <IoAddCircleOutline size={25} className="mr-1"/>เพิ่มกลุ่ม
            </Button>
            <AddGamePanel 
                show={modalShow}
                onHide={()=>setModalShow(false)}
            />
        </Container>
    )
}

export default GamePanel;