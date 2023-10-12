import { useFetchGameOfUserQuery } from "../../store";
import { Link } from "react-router-dom";
import './GameItem.css'

export default function GameItems (){
    const { data,isFetching } = useFetchGameOfUserQuery();

    let content;
    if(isFetching){
        content = <h6>Loading.......</h6>
    }else{
        content = data?.map((item,id)=>{
            return <h6 className="text-break" key={id}>
                    <Link to={item.games.gid.toString()} className="text-decoration-none link-g">
                        {item.games.name}
                    </Link>
                </h6>
        })
    }

    return(
        <>
            {content}
        </>
    );

}