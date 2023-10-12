/* eslint-disable react/prop-types */
import { useFetchFollowedGameQuery } from "../store";
import { Card } from "react-bootstrap";

function PostItem({page,className}) {
    const { data,isFetching } = useFetchFollowedGameQuery(page);

    let content;
    if(isFetching){
        content = <h4>Loading.............</h4>
    }else{
        console.log(data);
    }

    return (              
        <Card className={className}>
            <Card.Header>Test</Card.Header>
            <Card.Body>Test</Card.Body>
        </Card>
    )
}

export default PostItem;