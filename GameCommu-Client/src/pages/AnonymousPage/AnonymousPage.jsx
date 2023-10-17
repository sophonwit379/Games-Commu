import './AnonymousPage.css'
import { Container,Row,Col,Button,Spinner } from 'react-bootstrap';
import { useState } from 'react';
import PostAnonymous from '../../components/PostAnonymous';

function AnonymousPage() {
  const [page,setPage] = useState(0);
  const [spin,setSpin] = useState(0);

  const loadPost = async () =>{
    setSpin(true);
    setPage(page + 1);
    setTimeout(() => {
      setSpin(false);
    }, 2000);
  }
    
  return (
      <Container fluid className='p-0'>
      <Row className='m-0 p-0'>
        <Col xl className='p-0'>
        </Col>
        <Col xl={7} className='p-0'>
          <Container className='d-flex justify-content-center flex-column align-items-center mt-5'>
              <PostAnonymous page={page}/>
              <Button 
                className='mt-4 w-75 d-flex justify-content-center align-items-center mb-5 shadow-none' 
                variant='outline-secondary' 
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
        </Col>
        <Col className='p-0'></Col>
      </Row>
    </Container>    
  )
}

export default AnonymousPage;