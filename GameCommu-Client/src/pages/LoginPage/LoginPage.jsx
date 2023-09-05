import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username,password);
    navigate("/home");
  }

  

  return (
    <>
      <Container style={{marginTop:'8rem'}} className='h-50 d-flex justify-content-center'>
        <Row className="w-50 item flex-column align-self-center">
          <Col>
            <Card>
              <Card.Body className="mt-3 d-flex flex-column ">
                <Form onSubmit={handleLogin}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Username"
                    className="mb-4"
                  >
                    <Form.Control 
                      placeholder="username007"
                      onChange={handleUsernameChange} 
                      value={username}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                      <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password}  
                      />
                  </FloatingLabel>
                  <Button 
                    className="mt-4 w-100" 
                    variant="secondary"
                    type="submit"
                    >
                      Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage;