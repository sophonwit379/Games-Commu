import { useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { 
  Card,
  Container,
} from "react-bootstrap";


function SelectGamesPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userData  = state?.values || '';

  useEffect(() => {
    if(userData === ''){
      navigate('/register');
    }
  }),[userData];
  
  const gameList = () =>{

  }

  return (
    <div style={{backgroundColor:'#9DB2BF'}} className="min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">
      <Container style={{minHeight:'50vh'}}>
        <Card style={{backgroundColor:'#DDE6ED'}} className="">
          <Card.Header><h4>SELECT GAME</h4></Card.Header>
          <Card.Body>

          </Card.Body>
        </Card>
      </Container>
    </div>

  )
}

export default SelectGamesPage;