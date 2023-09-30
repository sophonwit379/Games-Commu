import { Navbar,Container,Form,Button,Row,Col, Card } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import gLogo from '../../assets/game-credits-game-logo.svg';
import { FaUserCircle } from "react-icons/fa";
import './HomePage.css'
import Post from '../../components/Post';
import { useState } from 'react';

function HomePage() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };
 
  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg min-vw-100 d-flex justify-content-between">
        <Container className='d-flex'> 
          <div className='d-flex'>
            <Link className='nav-logo mr-4' to='/home'>  
                  <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
            </Link>
            <Form className="d-flex align-items-center">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="secondary">Search</Button>
            </Form>
          </div>
          <Navbar.Toggle id='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='nav-collapse' className='justify-content-end'> 
            <Link className='nav-link' onClick={handleLogout}>ออกจากระบบ</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Row className='m-0 p-0'>
          <Col>1 of 3</Col>
          <Col xs={7}>
            <Container className='d-flex justify-content-center flex-column align-items-center'>
              <Button className='mt-4 w-75' variant='outline-secondary' onClick={()=>setModalShow(true)}>
                สร้างโพสต์
              </Button>
              <Post
                show={modalShow}
                onHide={()=>setModalShow(false)}
              />
              <Card className='mt-4 w-75'>
                <Card.Header>Test</Card.Header>
                <Card.Body>Test</Card.Body>
              </Card>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </div>    
    </div>
  );
}

export default HomePage;
