import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Button,
  Card,
  Container,
  Image,
  Row
} from "react-bootstrap";
import { toast } from 'react-toastify';
import { useGetGamesQuery } from "../../store";
import { useAddSelectGameMutation } from "../../store";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function SelectGamesPage() {
  const [selectedGame,setSelectedGame] = useState([]);
  const navigate = useNavigate();
  const [addSelectGames] = useAddSelectGameMutation();
  const { data: gamesData, isFetching: gamesIsFetching } = useGetGamesQuery();

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
  if(gamesIsFetching){
    content = 
      <Row>
        <Container className="m-3 d-flex justify-content-center align-items-center w-100 h-100">
          <SkeletonTheme baseColor="#F5F5F5" highlightColor="#DDE6ED">
            <Skeleton className="mr-5" height={186} width={175}/>
            <Skeleton className="mr-5" height={186} width={175}/>
            <Skeleton className="mr-5" height={186} width={175}/>
            <Skeleton className="mr-5" height={186} width={175}/>
            <Skeleton height={186} width={175}/>
          </SkeletonTheme>
        </Container>
      </Row>
  }else{
    content = gamesData?.map((game,id) => {
      return (
        <Row key={id}>
          <Container 
              className="m-3 d-flex flex-column justify-content-center align-items-center w-100 h-100"
              onClick={() => handleSelectGame(game)}
          >
            <div style={{width:'95%',height:'95%'}} className="position-relative justify-content-center d-flex align-items-center flex-column">
              <Image src={game.url} rounded height={125} width={175} className="z-1"/>
              <h6 className="z-1">{game.name}</h6>
              <p className="z-1">{game.year}</p>
              {selectedGame.includes(game) && <div style={{backgroundColor:'#9DB2BF',height:'95%'}} className="position-absolute w-100 d-flex"></div>}
            </div>
           
          </Container>
        </Row>
      );
    });
  }
  
  const handleSubmit = () => {
    if(selectedGame.length >= 3 ){
      selectedGame.forEach(async game => {
        console.log(game);
        await addSelectGames(game)
      });
      navigate('/home')
      toast.success('สมัครสมาชิกสำเร็จ', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      toast.error('กรุณาเลือกเกมอย่างน้อย 3 เกม', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
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
            <h4>SELECT GAME</h4>
              <h6>กรุณาเลือกเกมอย่างน้อย 3 เกม</h6>
          </Card.Header>
          <Card.Body style={{overflowX:"hidden"}} className="d-flex flex-wrap pb-5">
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