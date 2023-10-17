import { Navbar,Container,Form,Button,Row,Col,Spinner,Image } from 'react-bootstrap';
import { Link,useNavigate,useLocation  } from 'react-router-dom';
import gLogo from '../../assets/game-credits-game-logo.svg';
import './HomePage.css'
import Post from '../../components/Post';
import { useState,useRef } from 'react';
import GamePanel from '../../components/GamePanel/GamePanel';
import { IoCreateOutline,IoSearchCircleOutline,IoLogOutOutline,IoSettingsOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { useFetchUserQuery } from '../../store';
import PostItem from '../../components/PostItem';
import PostByGame from '../../components/PostByGame';
import { setData } from '../../store';
import { useDispatch } from 'react-redux';
import { postApi } from '../../store/apis/postApi';
import { postByGameApi } from '../../store/apis/postByGameApi';
import { imageApi } from '../../store/apis/imageApi';
import { likeApi } from '../../store/apis/likeApi';
import FetchAllPosted from '../../components/FetchAllPosted';
import FetchAllCommented from '../../components/FetchAllCommented';
import ImageProfile from '../../components/ImageProfile';
import Skeleton from 'react-loading-skeleton';
import FetchByDetail from '../../components/FetchByDetail';

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { data:user,isFetching } = useFetchUserQuery();
  const [modalShow, setModalShow] = useState(false);
  const [page,setPage] = useState(0);
  const [spin,setSpin] = useState(false);
  const modalFormRef = useRef(null);
  const gid = location.pathname.split('/home/')[1];
  const posted = location.pathname.split('/home/posted/')[1];
  const search = location.pathname.split('h/')[0];
  const [searchValue, setSearchValue] = useState('');
  const [realSearch, setRealSearch] = useState('');

  let userDropdown;
  let content;
  if(isFetching){
    userDropdown = <Skeleton width={55} height={55}/>
    content = <Skeleton height={800}/>
  }else{
    const handleCloseModal = () => {
      setModalShow(false);
      modalFormRef.current.resetForm();
    }
  
    const loadPost = async () =>{
      setSpin(true);
      setPage(page + 1);
      setTimeout(() => {
        setSpin(false);
      }, 2000);
    }
    const handleLogout = () => {
      setPage(0);
      dispatch(setData([]));
      dispatch(postByGameApi.util.resetApiState());
      dispatch(postApi.util.resetApiState());
      dispatch(imageApi.util.resetApiState());
      dispatch(likeApi.util.resetApiState());
      navigate('/');
      toast.success('ออกจากระบบสำเร็จ', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    };
    userDropdown = 
      <NavDropdown 
        title={    
          <div className='d-flex justify-content-center align-items-center'>
            <ImageProfile cla uid={user.uid} height={55} className='mr-1 border border-2' roundedCircle/>
          </div>
        } 
        className='custom-nav-dropdown'>
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
    let gidCheck 
    if(gid === undefined || posted !== undefined){
      gidCheck = false;
    }else{
      gidCheck = gid;
    }
    content = 
      <Container className='d-flex justify-content-center flex-column align-items-center'>
        <Button 
          className='mt-4 w-75 d-flex justify-content-center align-items-center shadow-none' 
          variant='outline-secondary' 
          onClick={()=>setModalShow(true)}
        >
          <IoCreateOutline size={25}/> สร้างโพสต์
        </Button>
        <Post
          show={modalShow}
          onHide={handleCloseModal}
          modalFormRef={modalFormRef}
          gid={gidCheck}
          setPage={setPage}
        />

        {gid===undefined && posted===undefined && search!=='/home/searc' &&
          <PostItem className='mt-4 w-75' setPage={setPage} page={page} uid={user?.uid}/>
        }
        {gid &&posted===undefined && search!=='/home/searc' &&
          <PostByGame className='mt-4 w-75' setPage={setPage} postData={{page,gid}} uid={user?.uid}/>
        }
        {gid==='posted/0' && search!=='/home/searc' &&
          <FetchAllPosted className='mt-4 w-75' setPage={setPage} page={page} uid={user?.uid}/>
        }
        {gid==='posted/1' && search!=='/home/searc' &&
          <FetchAllCommented className='mt-4 w-75' setPage={setPage} page={page} uid={user?.uid}/>
        }
        {search==='/home/searc' &&
          <FetchByDetail className='mt-4 w-75' setPage={setPage} page={page} uid={user?.uid} search={realSearch}/>
        }
        <Button 
          className='mt-4 w-75 d-flex justify-content-center align-items-center mb-5 shadow-none' variant='outline-secondary' 
          onClick={loadPost}
          disabled={spin}
        >
          {!spin? "เพิ่มเติม":                                    
            <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
        </Button>
      </Container>
  }

  
  const handleClick = ()=>{
    setPage(0);
    dispatch(setData([]));
    dispatch(postApi.util.resetApiState());
    dispatch(postByGameApi.util.resetApiState());
    dispatch(imageApi.util.invalidateTags(['PostImg']));
    dispatch(likeApi.util.resetApiState());

  }

  const handleSearch = (e) => {
    e.preventDefault();
    setRealSearch(searchValue);
    setPage(0);
    dispatch(setData([]));
    dispatch(postApi.util.resetApiState());
    dispatch(postByGameApi.util.resetApiState());
    dispatch(imageApi.util.invalidateTags(['PostImg']));
    dispatch(likeApi.util.resetApiState());
    navigate(`/home/search/${searchValue}`)
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  console.log(gid,posted,search);

  return (
    <div className='min-vh-100' >
      <Navbar expand="lg" className="nav-bg d-flex justify-content-between">
        <Container className='d-flex'> 
          <div className='d-flex'>
            <Link className='nav-logo mr-4' to='/home' onClick={handleClick}>  
                  <img style={{width:'4rem'}} src={gLogo} alt="logo" className="d-flex"/>
            </Link>
          </div>
          <Navbar.Toggle id='nav-tog' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='nav-collapse'> 
          <Nav className="w-100 d-flex justify-content-between">
            <Form noValidate className="d-flex align-items-center nav-search" onSubmit={handleSearch}>
              <Form.Control
                name='search'
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchValue}
                onChange={handleInputChange}
              />
              <Button type='submit' variant="secondary" className='d-flex flex-row align-items-center'> 
                <IoSearchCircleOutline size={25}/> ค้นหา                                   
              </Button>
            </Form>
              {userDropdown}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className='p-0 overflow-auto'>
        <Row className='m-0 p-0'>
          <Col xl className='p-0'>
            <GamePanel setPage={setPage}/>
          </Col>
          <Col xl={7} className='p-0'>
            {content}
          </Col>
          <Col className='p-0'></Col>
        </Row>
      </Container>    
    </div>
  );
}

export default HomePage;
