import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { Outlet,Link,NavLink } from "react-router-dom";
import gLogo from './assets/game-credits-game-logo.svg';

function App() {

  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg">
        <Container className='nav-contain'> 
          <Link className='nav-logo' to='/'>  
            <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
          </Link>
          <Navbar.Toggle className='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='justify-content-end'>
            <Nav id="nav-active">
              <NavLink className='links' to="/login" >
                เข้าสู่ระบบ
              </NavLink>
              <NavLink className='links' to="/register" >
                สมัครสมาชิก
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  )
}

export default App
