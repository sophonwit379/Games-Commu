import { useFetchGameOfUserQuery } from "../../store";
import { Container } from "react-bootstrap";

export default function GameItems (){
    const { data,isFetching } = useFetchGameOfUserQuery();

    let content;
    if(isFetching){
        content = <h6>Loading.......</h6>
    }else{
        content = data?.map((item,id)=>{
            return <h6 className="text-break" key={id}>{item.games.name}</h6>
        })
    }

    return(
        <>
            {content}
        </>
    );

}