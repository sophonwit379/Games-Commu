/* eslint-disable react/prop-types */
import { useCountPostImgQuery } from "../store";
import default_pfp from '../assets/Default_pfp.svg'
import { Card, Container,Image } from "react-bootstrap";
import ImagesItem from './ImagesItem';
import Skeleton from "react-loading-skeleton";

function PostItemList({pid,username,date,detail}) {
    const { data, isFetching } = useCountPostImgQuery(pid);

    let content;
    if(isFetching){
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
                        <Image src={default_pfp} width={45} height={45} className='mr-2' roundedCircle/>
                        <div className="align-self-center">
                            <h6 className="m-0">{username}</h6>
                            <p style={{fontSize:'0.80rem',margin:0}}>
                                โพสต์เมื่อ {date}
                            </p>
                        </div>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <p>
                        {detail}
                    </p>
                    <ImagesItem callData={callData}/>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
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