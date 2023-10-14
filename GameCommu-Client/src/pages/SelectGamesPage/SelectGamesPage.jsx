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
import { useFetchNotSelectedGamesQuery,useAddSelectGameMutation } from "../../store";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import noImg from '../../assets/no-image.svg'
import './SelectGamesPage.css'
import Spinner from 'react-bootstrap/Spinner';

function SelectGamesPage() {
  const [selectedGame,setSelectedGame] = useState([]);
  const navigate = useNavigate();
  const [addSelectGames] = useAddSelectGameMutation();
  const { data: gamesData, isFetching: gamesIsFetching } = useFetchNotSelectedGamesQuery();
  const [spin, setSpin] = useState(false); 


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
        <Container className="m-3 p-0 d-flex w-100 h-100" fluid>
          <SkeletonTheme baseColor="#F5F5F5" highlightColor="#DDE6ED">
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
          </SkeletonTheme>
        </Container>
  }else{
    content = gamesData?.map((game) => {
      return (
        <Container key={game.gid}
          id="con-width"
          className="p-0 m-0 d-flex flex-column justify-content-center align-items-center h-100"
          onClick={() => {
            if(!spin){
              handleSelectGame(game)
            }
          }}
        >
            <div style={{width:'95%',height:'95%'}} className="position-relative justify-content-center d-flex align-items-center flex-column">
              <Image src={noImg} rounded height={125} width={175} className="z-1"/>
              <div className="z-1 d-flex flex-column align-items-center">
                <h6 className="text-break text-center">{game.name}</h6>
                <p>{game.year}</p>
              </div>
              {selectedGame.includes(game) && <div style={{backgroundColor:'#9DB2BF',height:'95%'}} className="position-absolute w-100 d-flex"></div>}
            </div>
        </Container>
      );
    });
  }
  
  const handleSubmit = async () => {
    if(selectedGame.length >= 1 ){
      setSpin(true);
      for (const game of selectedGame) {
        await addSelectGames(game);
      }
      setSpin(false);
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
      toast.error('กรุณาเลือกเกมอย่างน้อย 1 เกม', {
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
              <h6>กรุณาเลือกเกมอย่างน้อย 1 เกม</h6>
          </Card.Header>
          <Card.Body className="d-flex flex-wrap p-3 p-0 overflow-x-hidden">
            {content}
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-end mt-3">
          <Button 
            className="w-25 mr-3" 
            variant="secondary"
            onClick={handleSubmit}
            disabled={spin}
          >
            {!spin? "ตกลง":                                    
                <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
          </Button>
        </div>
        
      </Container>
    </div>

  )
}

export default SelectGamesPage;