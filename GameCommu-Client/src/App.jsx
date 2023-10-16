import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import { Outlet,Link,NavLink } from "react-router-dom";
import gLogo from './assets/game-credits-game-logo.svg';
import { IoLogInOutline,IoBookOutline } from "react-icons/io5";
import { useEffect } from 'react';
import useClearUserToken from './hooks/use-clear-user-token';
import { postApi } from './store/apis/postApi';
import { useDispatch } from 'react-redux';
import { setData } from './store';
import { imageApi } from './store/apis/imageApi';

function App() {
  const { clear } = useClearUserToken();
  const dispatch = useDispatch();

  useEffect(()=>{
    clear();
  },[clear])

  const handleClick = ()=>{
    dispatch(setData([]));
    dispatch(postApi.util.resetApiState());
    dispatch(imageApi.util.resetApiState());
  }
  return (
    <div className='min-vh-100'>
      <Navbar expand="lg" className="nav-bg">
        <Container className='nav-contain'> 
          <Link className='nav-logo' onClick={handleClick} to='/'>  
            <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
          </Link>
          <Navbar.Toggle className='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className='justify-content-end'>
            <Nav id="nav-active">
              <NavLink className='links' to="/login" >
                <IoLogInOutline size={25}/> เข้าสู่ระบบ
              </NavLink>
              <NavLink className='links' to="/register" >
                <IoBookOutline size={22}/> สมัครสมาชิก
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
