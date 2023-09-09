import { Navbar,Container,Form,Button } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import gLogo from '../../assets/game-credits-game-logo.svg';
import { FaUserCircle } from "react-icons/fa";
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };
 
  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg min-vw-100 d-flex justify-content-between">
        <Container className='d-flex'> 
          <div className='d-flex'>
            <Link className='nav-logo mr-3' to='/home'>  
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
    </div>
  );
}

export default HomePage;
