/* eslint-disable react/prop-types */
import { Container,Image,Spinner,Form,Button } from "react-bootstrap"
import default_pfp from '../assets/Default_pfp.svg'
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import ImageComment from './ImagesComment';
import Skeleton from "react-loading-skeleton";
import { BsReply } from "react-icons/bs";
import Reply from "./Reply";
import * as formik from 'formik';
import * as yup from 'yup';
import { 
    useRemoveCommentMutation ,
    useCountCommentImgQuery,
    useAddReplyMutation
} from "../store";
import './CommentList.css';

function CommentList({cid,username,date,isOwner,page,detail}) {
    const [ addReply ] = useAddReplyMutation();
    const { Formik } = formik;
    const [ spinRemove,setSpinRemove ] = useState(false);
    const [ spin,setSpin ] = useState(false);
    const [ removeComment ] = useRemoveCommentMutation();
    const { data,isFetching } = useCountCommentImgQuery(cid);
    const [ reply,setReply ] = useState(false);
    const handleRemove = async (cid) => {
        setSpinRemove(true)
        await removeComment(cid);
        setSpinRemove(false)
    }  


    const replyValidation = yup.object().shape({
        detail: yup.string().required('กรุณาพิมพ์ข้อความ'),
    });

    const handleReply = async (value) =>{
        setSpin(true)
        const data = {
            rid:cid,
            detail:value.detail
        }
        await addReply(data);
        setSpin(false);
        setReply(false);
    }

    let content;
    if(isFetching){
        content = <Skeleton width={400} height={75}/>
    }else{
        content = 
        <Container key={cid} className="p-2 mt-3 border-top border-bottom ml-0" fluid>
            <div className="d-flex">
                <Image src={default_pfp} width={45} height={45} className="mr-2" roundedCircle/>
                <div className="align-self-center">
                    <h6 className="m-0">{username}</h6>
                    <p style={{fontSize:'0.80rem',margin:0}}>
                        เวลา {date}
                    </p>
                </div>
            </div>
            <div className="w-100 d-flex mt-2">
                คอมเม้นต์
                {isOwner &&<>
                    {!spinRemove? <AiOutlineDelete className="ml-1" onClick={()=>handleRemove(cid)} id="remove-hover" size={20}/>:                                    
                        <Spinner className="mr-1" style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                </>}
            </div>
            <div>
            </div>
            <p className="px-1 pt-2  text-break w-100">
                {detail}
            </p>
            {data > 0 && <ImageComment cid={cid}/>}
            {!reply&&<div className="d-flex w-100 mt-2 my-2">
                ตอบกลับ <BsReply className="ml-1" size={25} onClick={()=>setReply(true)} id="reply-hover"/> 
            </div>}
            <Reply
                page={page}
                rid={cid}
            />
            {reply&&<Formik
                initialValues = {{
                    detail:'',
                }}
                validationSchema={replyValidation}
                onSubmit={handleReply}
                validateOnChange={false}
            >
                {({handleSubmit, setFieldValue,values, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="floatingTextarea2" label="ข้อความ" className="w-100 mt-3 mb-1">
                            <Form.Control
                                disabled={spin}
                                as="textarea" 
                                name="detail" 
                                placeholder='พิมพ์ข้อความ' 
                                value={values.detail}
                                onChange={(event) => {
                                    setFieldValue('detail',event.target.value)
                                }}
                                isInvalid={!!errors.detail} 
                                style={{ height: '100px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.detail}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            disabled={spin}
                            className="mt-3 mr-2 w-25"
                            variant='outline-secondary'
                            onClick={()=>setReply(false)}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            disabled={spin}
                            className="mt-3 w-25"
                            variant='outline-secondary'
                            type="submit"
                        >
                            {!spin? "โพสต์":                                    
                                <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            }
                        </Button>
                    </Form>
                )}
            </Formik>}
        </Container>
    }
    return(
       <div className="">
        {content}
       </div>
    )
}

export default CommentList;