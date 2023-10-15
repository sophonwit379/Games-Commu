import { useFetchGameOfUserQuery,setData } from "../../store";
import { postByGameApi } from "../../store/apis/postByGameApi";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { postApi } from "../../store/apis/postApi"; 
import './GameItem.css'

// eslint-disable-next-line react/prop-types
export default function GameItems ({setPage}){
    const dispatch = useDispatch();
    const { data,isFetching } = useFetchGameOfUserQuery();

    const handleClick = async () => {
        await setPage(0);
        dispatch(setData([]));
        dispatch(postByGameApi.util.resetApiState());
        dispatch(postApi.util.resetApiState());
    }

    let content;
    if(isFetching){
        content = <Skeleton height={25} count={5}/>
    }else{
        content = data?.map((item,id)=>{
            return <h6 className="text-break" key={id}>
                    <Link to={item.gid.toString()} onClick={handleClick} className="text-decoration-none link-g">
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