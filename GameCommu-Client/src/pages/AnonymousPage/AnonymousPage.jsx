import './AnonymousPage.css'
import { Container,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import PostAnonymous from '../../components/PostAnonymous';

function AnonymousPage() {
    const [page,setPage] = useState(0);

    return (
        <Container fluid className='p-0'>
        <Row className='m-0 p-0'>
          <Col xl className='p-0'>
          </Col>
          <Col xl={7} className='p-0'>
            <Container className='d-flex justify-content-center flex-column align-items-center mt-4'>
                <PostAnonymous page={page}/>
            </Container>
          </Col>
          <Col className='p-0'></Col>
        </Row>
      </Container>    
    )
}

export default AnonymousPage;