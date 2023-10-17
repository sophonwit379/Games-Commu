/* eslint-disable react/prop-types */
import { useFetchReplyQuery } from "../store";
import { Container,Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import default_pfp from '../assets/Default_pfp.svg'

function Reply({rid,page}) {
    const { data,isFetching } = useFetchReplyQuery({rid,page});

    let content;
    if(isFetching){
        content =  <Skeleton width={400} height={25}/>
    }else if(data?.length > 0){
        console.log(data);
        content = data.map((reply,id)=>{    
            const date = new Date(reply.date);
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
                <div key={id}>
                    <div className="d-flex">
                        <Image src={default_pfp} width={45} height={45} className="mr-2" roundedCircle/>
                        <div className="align-self-center">
                            <h6 className="m-0">{reply.username}</h6>
                            <p style={{fontSize:'0.80rem',margin:0}}>
                                เวลา {formattedDate}
                            </p>
                        </div>
                    </div>
                    <p className="px-1 pt-2  text-break w-75">
                        {reply.detail}
                    </p>
                </div>
            )
        })
            
    }   

    return (
        <Container className="ml-5 border-top p-2 w-75">
            {content}
        </Container>
    )
}

export default Reply;