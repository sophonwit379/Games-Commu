/* eslint-disable react/prop-types */
import { Container,Image,Spinner } from "react-bootstrap"
import default_pfp from '../assets/Default_pfp.svg'
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { 
    useRemoveCommentMutation 
} from "../store";
import './CommentList.css';

function CommentList({cid,username,date,isOwner}) {
    const [ spin,setSpin ] = useState(false);
    const [ removeComment ] = useRemoveCommentMutation();
    const handleRemove = async (cid) => {
        setSpin(true)
        await removeComment(cid);
        setSpin(false)
    }  

    return(
        <Container key={cid} className="p-0" fluid>
            <div className="d-flex">
                <Image src={default_pfp} width={45} height={45} className="mr-2" roundedCircle/>
                <div className="align-self-center">
                    <h6 className="m-0">{username}</h6>
                    <p style={{fontSize:'0.80rem',margin:0}}>
                        เวลา {date}
                    </p>
                </div>
            </div>
            {isOwner &&
                <div className="w-75 d-flex justify-content-end">
                    {!spin? <AiOutlineDelete onClick={()=>handleRemove(cid)} id="remove-hover" size={20}/>:                                    
                        <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </div>
            }
            <p className="px-1 py-2 text-break w-75">
                5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
            </p>
        </Container>
    )
}

export default CommentList;