/* eslint-disable react/prop-types */
import { Container,Accordion, Button } from "react-bootstrap";
import { AiOutlineFileAdd } from "react-icons/ai";
import './GamePanel.css'
import { IoAddCircleOutline,IoRemoveCircleOutline } from "react-icons/io5";
import { useState,useRef } from "react";
import AddGamePanel from './AddGamePanel';
import DeleteGamePanel from './DeleteGamePanel';
import GameItems from "./GameItems";
import PostedItems from './PostedItems';
import RequestGamePanel from "./RequestGamePanel";


function GamePanel({setPage}) {
    const requestFormRef = useRef(null);
    const [addGame, setAddGame] = useState(false);
    const [deleteGame, setDeleteGame] = useState(false);
    const [requestGame,setRequestGame] = useState(false);

    const handleCloseRequest = () => {
        setRequestGame(false);
        requestFormRef.current.resetForm();
    }

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
            <Accordion className="p-0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>แสดงโพส</Accordion.Header>
                    <Accordion.Body>
                        <PostedItems setPage={setPage}/>
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
            <Button 
                id="add-bt" 
                variant="outline-secondary" 
                className="w-100 d-flex flex-row align-items-center"
                onClick={()=>setRequestGame(true)}
            >
            <AiOutlineFileAdd size={25} className="mr-1"/>ขอเพิ่มเกม
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
            <RequestGamePanel
                show={requestGame}
                onHide={handleCloseRequest}
                reportFormRef={requestFormRef}
            />
        </Container>
    )
}

export default GamePanel;