import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <Navbar expand="lg" className="nav-bg">
        <Container className='nav-con'> 
          <Link className='nav-logo' to='/'>  
            GameCommu
          </Link>
          <Navbar.Toggle className='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav-active" className="me-auto">
              <NavLink className='links' to="/login" >
                Login
              </NavLink>
              <NavLink className='links' to="/register" >
                Register
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
