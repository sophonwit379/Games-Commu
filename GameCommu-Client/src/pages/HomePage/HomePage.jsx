import { Navbar,Container,Form,Button,Row,Col,Card,Image } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import gLogo from '../../assets/game-credits-game-logo.svg';
import './HomePage.css'
import Post from '../../components/Post';
import { useState,useRef } from 'react';
import GamePanel from '../../components/GamePanel/GamePanel';
import { IoCreateOutline,IoSearchCircleOutline,IoLogOutOutline,IoSettingsOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import default_pfp from '../../assets/Default_pfp.svg'
import { useFetchUserQuery } from '../../store';

function HomePage() {
  const navigate = useNavigate();
  const { data:user } = useFetchUserQuery();
  const [modalShow, setModalShow] = useState(false);
  const modalFormRef = useRef(null);
  const userprofile = <div className='d-flex justify-content-center align-items-center'>
                        <Image src={default_pfp} width={45} className='mr-1' roundedCircle/>
                      </div>

  const handleLogout = () => {
    navigate('/');
    toast.success('ออกจากระบบสำเร็จ', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleCloseModal = () => {
    setModalShow(false);
    modalFormRef.current.resetForm();
  }
 
  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg min-vw-100 d-flex justify-content-between">
        <Container className='d-flex'> 
          <div className='d-flex'>
            <Link className='nav-logo mr-4' to='/home'>  
                  <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
            </Link>
          </div>
          <Navbar.Toggle id='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='nav-collapse'> 
          <Nav className="w-100 d-flex justify-content-between">
            <Form className="d-flex align-items-center nav-search">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="secondary" className='d-flex flex-row align-items-center'> 
                <IoSearchCircleOutline size={25}/> Search
              </Button>
            </Form>
            <NavDropdown title={userprofile} className='custom-nav-dropdown'>
              <NavDropdown.Item >
                <h5 className='txt-wrap'>{user?.username}</h5>
                <Button onClick={()=> navigate(`/setting`)} className='bt-link'>
                  <IoSettingsOutline size={25} className='icon-m'/> ตั้งค่า
                </Button>
                <Button className='bt-link' onClick={handleLogout}>
                  <IoLogOutOutline size={25} className='icon-m'/> ออกจากระบบ
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='p-0'>
        <Row className='m-0 p-0'>
          <Col xl className='p-0'>
            <GamePanel/>
          </Col>
          <Col xl={7}>
            <Container className='d-flex justify-content-center flex-column align-items-center'>
              <Button className='mt-4 w-75 d-flex justify-content-center align-items-center' variant='outline-secondary' onClick={()=>setModalShow(true)}>
                <IoCreateOutline size={25}/> สร้างโพสต์
              </Button>
              <Post
                show={modalShow}
                onHide={handleCloseModal}
                modalFormRef={modalFormRef}
              />
              
              <Card className='mt-4 w-75'>
                <Card.Header>Test</Card.Header>
                <Card.Body>Test</Card.Body>
              </Card>
            </Container>
          </Col>
          <Col ></Col>
        </Row>
      </Container>    
    </div>
  );
}

export default HomePage;
