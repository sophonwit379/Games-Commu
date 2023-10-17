/* eslint-disable react/prop-types */
import { useFetchAllPostedQuery,setData,selectData, } from "../store";
import { Container } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import PostItemList from "./PostItemList";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

function FetchAllPosted({page,className,uid,setPage}) {
    const dispatch = useDispatch();
    const storeData = useSelector(selectData);
    const { data,isFetching } = useFetchAllPostedQuery(page);

    useEffect(()=>{
        if(!isFetching){ 
            dispatch(setData(data));
        }
    },[isFetching, dispatch])


    let content;
    if(isFetching && storeData.length === 0){
        content = 
            <Container className="p-0" fluid>
                <Skeleton height={650}/>
            </Container>
    }else{
        content = storeData?.map((post)=>{
            const isOwner = post.uid === uid;
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
                    uid={uid}
                    username={post.username}
                    isOwner={isOwner}
                    postUid={post.uid}
                    page={page}
                    date={formattedDate.toString()}
                    detail={post.detail}
                    setPage={setPage}
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
        <>
            <div className={className}>
                {content}
            </div>
        </>
    )
}

export default FetchAllPosted;