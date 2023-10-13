/* eslint-disable react/prop-types */
import { useFetchFollowedGameQuery } from "../store";
import { Container } from "react-bootstrap";
import PostItemList from "./PostItemList";
import Skeleton from "react-loading-skeleton";

function PostByGame({postData,className}) {
    const { data,isFetching } = useFetchFollowedGameQuery(postData);

    let content;
    if(isFetching){
        content = 
            <Container className="p-0" fluid>
                <Skeleton height={650}/>
            </Container>

        
    }else{
        console.log(data);
        content = data?.map((post)=>{
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
                    username={post.username}
                    date={formattedDate.toString()}
                    detail={post.detail}
                />
            )
        });
    }

    return (        
        <>
            <div className={className}>
                {content}
            </div>
        </>
    )
}

export default PostByGame;