/* eslint-disable react/prop-types */
import default_pfp from '../assets/Default_pfp.svg'
import { Card, Container,Image } from "react-bootstrap";
import ImagesItem from './ImagesItem';
import Skeleton from "react-loading-skeleton";
import { AiOutlineLike,AiOutlineComment,AiOutlineDislike,AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './PostItemList.css';
import ConfirmRemovePost from './ConfirmRemovePost';
import ConfirmEditPost from './ConfirmEditPost';
import { useState } from "react";
import { 
    useCountPostImgQuery,
    useFetchGameByIdQuery,
    useAddLikePostMutation,
    useFetchLikePostQuery,
    useRemoveLikePostMutation,
} from "../store";

function PostItemList({pid,gid,username,date,detail,isOwner,page,setPage}) {
    const [openRemove,setOpenRemove] = useState(false);
    const [openEdit,setOpenEdit] = useState(false);
    const [loadLike,setLoadLike] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('Token');
    const [ addLike ] = useAddLikePostMutation();
    const [ removeLike ] = useRemoveLikePostMutation();
    const { data:like ,isFetching:isLike } = useFetchLikePostQuery(pid);
    const { data, isFetching } = useCountPostImgQuery(pid);
    const { data:game, isFetching:isGame } = useFetchGameByIdQuery(gid);

    let content;
    let LikeContent;
    
    const postLike = async () =>{
        if(token){
            setLoadLike(true);
            await addLike({pid});
            setLoadLike(false);
        }else{
            toast.info("กรุณาล็อกอิน", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
              });
            navigate('/login');
        }
    }

    const removePostLike = async () =>{
        if(token){
            setLoadLike(true);
            await removeLike({pid});
            setLoadLike(false);
        }else{
            toast.info("กรุณาล็อกอิน", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
              });
            navigate('/login');
        }
    }

    if (isLike || loadLike){
        LikeContent = <Skeleton height={20} width={60}/>
    }else{
        LikeContent =                     
            <div className="m-0 d-flex justify-content-center align-items-center">
                <h6 className="m-0 hover">
                    <AiOutlineLike onClick={postLike} className="mr-1" size={23}/>
                </h6>
                <h6 className="m-0 hover">
                    <AiOutlineDislike onClick={removePostLike} className="mr-1" size={23}/>
                </h6>
                {like}
            </div>
    }
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
                                <h6 className="mt-1 mr-2">{game.name}</h6>
                            </div>
                        </div>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-end">
                        {isOwner === username && 
                            <div>
                                <AiOutlineEdit onClick={()=>setOpenEdit(true)} id="edit-hover" size={25}/>
                                <AiOutlineDelete onClick={()=>setOpenRemove(true)} id="remove-hover" size={25}/>
                            </div>
                        }
                        <ConfirmRemovePost
                            show={openRemove}
                            onHide={()=>setOpenRemove(false)}
                            pid={pid}
                            setPage={setPage}
                        />
                        <ConfirmEditPost
                            show={openEdit}
                            onHide={()=>setOpenEdit(false)}
                            pid={pid}
                            pageNumber={page}
                            detail={detail}
                            setPage={setPage}
                        />
                    </div>
                    <p>
                        {detail}
                    </p>
                    <ImagesItem callData={callData}/>
                </Card.Body>
                <Card.Footer id="foot" className="d-flex justify-content-between align-items-center p-3">
                    {LikeContent}
                    <h6 className="m-0 hover">
                        <AiOutlineComment className="mr-1" size={25}/>
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