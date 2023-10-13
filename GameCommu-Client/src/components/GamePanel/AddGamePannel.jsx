import { Modal } from "react-bootstrap";
import { useFetchNotSelectedGamesQuery } from "../../store";
import Skeleton from "react-loading-skeleton";

function AddGame(props) {
  const { data,isFetching } = useFetchNotSelectedGamesQuery();

  let content;
  if(isFetching){
    content = <Skeleton/>
  }else{
    console.log(data);
    content = data.map((game)=>{
      return <p key={game.gid}>{`${game.name} (${game.year})`}</p>
    })
  }


  return (
    <Modal  
      {...props}
      centered
      scrollable
    >
      <Modal.Header>
          รายชื่อเกม
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
    </Modal>
  )
}

export default AddGame;