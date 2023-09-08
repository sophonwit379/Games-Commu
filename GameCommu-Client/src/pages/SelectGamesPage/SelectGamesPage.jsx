import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { 
  Button,
  Card,
  Container,
  Image,
  Row
} from "react-bootstrap";
import { useAddGameMutation,useFetchGameListQuery } from "../../store";


function SelectGamesPage() {
  const [selectedGame,setSelectedGame] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const userData  = state?.values || '';
  const {data,isFetching,error} = useFetchGameListQuery();
  const [addGame,addGameResult] = useAddGameMutation();

  // useEffect(() => {
  //   if(userData === ''){
  //     navigate('/register');
  //   }
  // }),[userData];

  const handleSelectGame = (game) => {
    const check = selectedGame.includes(game);
    if(check){
      const id = selectedGame.indexOf(game);
      let newArr = selectedGame;
      newArr.splice(id, 1);
      setSelectedGame([...newArr]);
    }else{
      selectedGame.push(game);
      setSelectedGame([...selectedGame])
    }
  }


  let content;
  if(isFetching){
    content = <div>Loading......</div>
  }else{
    content = data.map(game => {
      return (
        <Row key={game.id}>
          <Container 
              className="m-3 d-flex flex-column justify-content-center align-items-center w-100 h-100"
              onClick={() => handleSelectGame(game)}
          >
            <div style={{width:'95%',height:'95%'}} className="position-relative justify-content-center d-flex align-items-center flex-column">
              <Image src={game.url} rounded height={125} width={175} className="z-1"/>
              <h6 className="z-1">{game.name}</h6>
              {selectedGame.includes(game) && <div style={{backgroundColor:'#9DB2BF'}} className="position-absolute w-100 h-100 d-flex"></div>}
            </div>
           
          </Container>
        </Row>
      );
    });
  }
  
  const handleSubmit = () => {
    if(selectedGame.length >= 3 ){
      navigate('/login')
    }
  }


  return (
    <div 
      style={{backgroundColor:'#9DB2BF'}}
       className="d-flex min-vh-100 justify-content-center"
    >
      <Container style={{minHeight:'75vh',marginTop:'5rem'}}>
        <Card style={{maxHeight:'70vh',backgroundColor:'#DDE6ED'}}>
          <Card.Header>
            <h4>SELECT GAME 
              <Button onClick={() => {
                  addGame();
                }}>
                + AddGame
              </Button>
            </h4>
              <h6>at least 3 game</h6>
          </Card.Header>
          <Card.Body style={{overflowX:"hidden"}} className="d-flex flex-wrap">
            {content}
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-end mt-3">
          <Button 
            className="w-25 mr-3" 
            variant="secondary"
            onClick={handleSubmit}
          >
            ตกลง
          </Button>
        </div>
        
      </Container>
    </div>

  )
}

export default SelectGamesPage;