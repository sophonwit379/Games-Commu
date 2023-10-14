import { Modal,Container,Image,Row,Button } from "react-bootstrap";
import { useFetchNotSelectedGamesQuery,useAddSelectGameMutation } from "../../store";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { toast } from 'react-toastify';
import noImg from '../../assets/no-image.svg'
import Spinner from 'react-bootstrap/Spinner';
import { gamesApi } from "../../store/apis/gamesApi";
import { useDispatch } from "react-redux";
import { selectGamesApi } from "../../store/apis/selectGamesApi";


function AddGame(props) {
  const dispatch = useDispatch();
  const { data,isFetching } = useFetchNotSelectedGamesQuery();
  const [addSelectGames] = useAddSelectGameMutation();
  const [spin, setSpin] = useState(false); 
  const [selectedGame,setSelectedGame] = useState([]);
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
    content =         
      <Container className="m-3 p-0 d-flex w-100 h-100" fluid>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
            <Skeleton className="mr-5 mt-0" height={165} width={225}/>
      </Container>
  }else{
    content = data.map((game)=>{
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
      )
    });
  }

  const handleSubmit = async () => {
    if(selectedGame.length >= 1 ){
      setSpin(true);
      for (const game of selectedGame) {
        await addSelectGames(game);
      }
      dispatch(gamesApi.util.invalidateTags(['followed']));
      dispatch(selectGamesApi.util.resetApiState());
      setSpin(false)
      toast.success('เพิ่มเกมสำเร็จ', {
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
    <Modal  
      {...props}
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <h4 className="p-2">SELECT GAME</h4>
      </Modal.Header>
      <Modal.Body>
        <Container className="p-0 d-flex flex-wrap" fluid>
          {content}
        </Container>
      </Modal.Body>
      <Modal.Footer>
          <div className="d-flex justify-content-end mt-3 w-100">
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
      </Modal.Footer>
    </Modal>
  )
}

export default AddGame;