import { Container,Accordion } from "react-bootstrap";
import './GamePanel.css'

function GamePanel() {
    const main_bg = {
        background: 'linear-gradient(to right, #DDE6ED, white)',
    };
    const bg = {
        background: 'linear-gradient(to right, #DDE6ED, white)',
    };

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
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                        <h6 className="pl-2">game 1</h6>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    )
}

export default GamePanel;