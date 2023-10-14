/* eslint-disable react/prop-types */
import { useCountPostImgQuery,useFetchGameByIdQuery } from "../store";
import default_pfp from '../assets/Default_pfp.svg'
import { Card, Container,Image } from "react-bootstrap";
import ImagesItem from './ImagesItem';
import Skeleton from "react-loading-skeleton";

function PostItemList({pid,gid,username,date,detail}) {
    const { data, isFetching } = useCountPostImgQuery(pid);
    const { data:game, isFetching:isGame } = useFetchGameByIdQuery(gid);

    let content;
    if(isFetching || isGame){
        content =
        <Container className="p-0" fluid>
            <Skeleton height={650}/>
        </Container>
    }else{
        const callData = {
            pid:pid,
            page:data
        }
        content = 
            <Card className="mb-5"> 
                <Card.Header className="">
                    <Container className="p-0 pt-2 pb-2 d-flex align-items-center" fluid>
                        <div className="d-flex justify-content-between w-100">
                            <div className='d-flex align-items-center'>
                                <Image src={default_pfp} width={45} height={45} className="mr-2" roundedCircle/>
                                <div className="align-self-center">
                                    <h6 className="m-0">{username}</h6>
                                    <p style={{fontSize:'0.80rem',margin:0}}>
                                        โพสต์เมื่อ {date}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h6 className="mt-1">{game.name}</h6>
                            </div>
                        </div>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <p>
                        {detail}
                    </p>
                    <ImagesItem callData={callData}/>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center p-3">
                    <h6>
                        Like
                    </h6>
                    <h6>
                        Comment
                    </h6>
                </Card.Footer>
            </Card>
    }
    
    return (
        <>
            {content}
        </>
    )
}

export default PostItemList;