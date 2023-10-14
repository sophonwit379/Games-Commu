import { useFetchGameOfUserQuery } from "../../store";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import './GameItem.css'

export default function GameItems (){
    const { data,isFetching } = useFetchGameOfUserQuery();

    let content;
    if(isFetching){
        content = <Skeleton height={25} count={5}/>
    }else{
        content = data?.map((item,id)=>{
            return <h6 className="text-break" key={id}>
                    <Link to={item.gid.toString()} className="text-decoration-none link-g">
                        {item.name}
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