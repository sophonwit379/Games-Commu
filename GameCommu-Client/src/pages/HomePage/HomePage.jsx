import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import gLogo from '../../assets/game-credits-game-logo.svg';
import { FaUserCircle } from "react-icons/fa";

function HomePage() {
 
  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg">
        <Container className='nav-con'> 
          <Link className='nav-logo' to='/home'>  
            <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
          </Link>
          <Navbar.Toggle className='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav id="nav-active">
              <Dropdown style={{width:'3rem',height:'3rem'}}>
                <FaUserCircle style={{color:'white'}} className='w-100 h-100 position-absolute'/>
                <Dropdown.Toggle className='opacity-0 w-100 h-100'>
                </Dropdown.Toggle>
                <Dropdown.Menu id='drop-d-m' >
                  <Dropdown.Item >Profile</Dropdown.Item>
                  <Dropdown.Item >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomePage;
