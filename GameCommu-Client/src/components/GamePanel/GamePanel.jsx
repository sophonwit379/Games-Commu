/* eslint-disable react/prop-types */
import { Container,Accordion, Button,Modal } from "react-bootstrap";
import './GamePanel.css'
import { IoAddCircleOutline,IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from "react";
import AddGamePanel from './AddGamePannel';
import DeleteGamePanel from './DeleteGamePanel';
import GameItems from "./GameItems";

function GamePanel({setPage}) {
    const [addGame, setAddGame] = useState(false);
    const [deleteGame, setDeleteGame] = useState(false);

    return (
        <Container fluid className="p-0 pb-2 rounded" id='main'>
            <Accordion className="p-0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>กลุ่มของคุณ</Accordion.Header>
                    <Accordion.Body>
                        <GameItems setPage={setPage}/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Button 
                id="add-bt" 
                variant="outline-secondary" 
                className="w-100 d-flex flex-row align-items-center"
                onClick={()=>setAddGame(true)}
            >
                <IoAddCircleOutline size={25} className="mr-1"/>เพิ่มกลุ่ม
            </Button>
            <Button 
                id="add-bt" 
                variant="outline-secondary" 
                className="w-100 d-flex flex-row align-items-center"
                onClick={()=>setDeleteGame(true)}
            >
                <IoRemoveCircleOutline size={25} className="mr-1"/>ลบกลุ่ม
            </Button>
            <AddGamePanel 
                size='xl'
                show={addGame}
                onHide={()=>setAddGame(false)}
            />
            <DeleteGamePanel
                size='xl'
                show={deleteGame}
                onHide={()=>setDeleteGame(false)}
            />
        </Container>
    )
}

export default GamePanel;