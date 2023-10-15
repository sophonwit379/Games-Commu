/* eslint-disable react/prop-types */
import { useFetchNotLoginQuery,selectData,setData} from "../store"
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import PostItemList from "./PostItemList";


function PostAnonymous({page}) {
    const {data,isFetching} = useFetchNotLoginQuery(page);
    const storeData = useSelector(selectData);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!isFetching){ 
            dispatch(setData(data));
        }
    },[dispatch, isFetching])

    let content;
    if(isFetching && page === 0){
        content =             
            <Container className="p-0" fluid>
                <Skeleton height={650}/>
            </Container>
    }else{
        content = storeData?.map((post)=>{
            const date = new Date(post.date);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            const thaiDateFormatter = new Intl.DateTimeFormat('th-TH', options);
            const formattedDate = thaiDateFormatter.format(date);
            return(
                <PostItemList 
                    key={post.pid} 
                    pid={post.pid}
                    gid={post.gid}
                    username={post.username}
                    date={formattedDate.toString()}
                    detail={post.detail}
                />
            )
        });
        if(content?.length === 0){
            return(
                <Container className="m-0 d-flex justify-content-center align-items-center pt-4" fluid>
                    <h4>ไม่มีโพสต์</h4>
                </Container>
            )
        }
    }


    return (
        <div className="w-75">
            {content}
        </div>
    )
}

export default PostAnonymous