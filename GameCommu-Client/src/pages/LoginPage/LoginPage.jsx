import { useNavigate } from "react-router-dom";
import { 
  FloatingLabel,
  Form,
  Card,
  Container,
  Row,
  Col,
  Button 
} from "react-bootstrap";


function LoginPage() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/home")
  }

  return (
    <>
      <Container style={{marginTop:'9rem'}} className='h-50 d-flex justify-content-center'>
        <Row className="w-50 align-self-center">
          <Col>
            <Card>
              <Card.Body className="mt-3 d-flex flex-column ">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-4"
                >
                  <Form.Control placeholder="username007" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
                <Button 
                  className="mt-4 " 
                  variant="secondary"
                  onClick={login}
                  >
                    Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage;