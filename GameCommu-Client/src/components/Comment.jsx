/* eslint-disable react/prop-types */
import { Modal,Container,Button,Form,Spinner,Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { BiCommentAdd } from "react-icons/bi";
import { PiKeyReturnBold } from "react-icons/pi";
import { useState } from "react";
import * as formik from 'formik';
import * as yup from 'yup';
import CommentList from "./CommentList";
import { useDispatch } from "react-redux";
import { commentApi } from "../store/apis/commentApi";
import { 
    useFetchCommentQuery,
    useAddCommentMutation,
    useUploadCommentImgMutation,
} from "../store";

function Comment({show,onHide,page,rid,pid,uid}) {
    const dispatch = useDispatch();
    const { Formik } = formik;
    const [ postComment,setPostComment ] = useState(false);
    const { data:commentData,isFetching:isComment } = useFetchCommentQuery({pid,page});
    const [ addComment ] = useAddCommentMutation();
    const [ addCommentImg ] = useUploadCommentImgMutation();
    const [ spin,setSpin ] = useState(false);
    const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
    const ALLOWED_FILE_TYPES = ['image/png','image/jpg','image/jpeg'];

    let content;
    if(isComment){
        content = <Skeleton width={400} height={100}/>
    }else if(commentData?.length === 0){
        content = <h5 className="pt-2">
            ไม่มีคอมเม้นต์
        </h5>
    }else{
        content = commentData?.map((data)=>{
            const isOwner = data.uid === uid;
            const date = new Date(data.date);
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
                <CommentList 
                    key={data.cid}
                    cid={data.cid}
                    isOwner={isOwner}
                    date={formattedDate}
                    username={data.username}
                    page={page}
                    detail={data.detail}
                />
            )
        })
    }

    
    const commentValidation = yup.object().shape({
        detail: yup.string().required('กรุณาพิมพ์ข้อความ'),
        images: yup.array()
        .of(
        yup.mixed()
            .required('Please select an image')
            .test(
            'fileSize',
            'ขนาดไฟล์ต้องน้อยกว่า 8MB',
            (value) => value && value.size <= MAX_FILE_SIZE 
            )
            .test(
            'fileType',
            'รองรับไฟล์ PNG, JPG, หรือ JPEG เท่านั้น',
            (value) =>
                value &&
                ALLOWED_FILE_TYPES.includes(value.type)
            )
        ),
    });

    const handleComment = async (value) =>{
        setSpin(true);
        const comment = {
            pid,
            detail:value.detail
        }
        const cid = await addComment(comment);
        if(value.images.length){
            console.log(value.images[0]);
            const image = {
                cid:cid.data,
                file:value.images[0]
            }
            await addCommentImg(image)
        }
        setPostComment(false);
        setSpin(false);
    }

    return (
        <Modal  
            show={show}
            centered
            scrollable
            size="xl"
        >
        <Modal.Body>
        <Modal.Header>
            <h5 >Comment</h5>
        </Modal.Header>
            <Container className="p-1 position-sticky" fluid>
                <br/>
                {content}
            </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start align-items-start flex-column p-3">
            {!postComment&&
                <div className="d-flex flex-row">
                    <Button
                        className="mr-2"
                        variant='outline-secondary'
                        onClick={()=>{
                            onHide();
                            dispatch(commentApi.util.resetApiState());
                        }}
                    >
                        <PiKeyReturnBold className="mr-1" size={25}/>ย้อนกลับ
                    </Button>
                    <Button
                        variant='outline-secondary'
                        onClick={()=>setPostComment(true)}
                    >
                        <BiCommentAdd className="mr-1" size={25}/>คอมเม้นต์
                    </Button>
                </div>
            }
            {postComment&&<Formik
                initialValues = {{
                    detail:'',
                    images: [],
                }}
                validationSchema={commentValidation}
                onSubmit={handleComment}
                validateOnChange={false}
            >
            {({handleSubmit, setFieldValue,values, errors}) => (
                <Form noValidate onSubmit={handleSubmit} className="w-100">
                    <Form.Group controlId="floatingTextarea2" label="ข้อความ" className="w-100 mb-3">
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
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload รูปภาพ</Form.Label>
                        <Form.Control 
                            disabled={spin}
                            as="input"
                            type="file"
                            name="images"
                            onChange={(event) => {
                                const filesArray = [...event.target.files];
                                setFieldValue('images', filesArray);
                            }}
                            isInvalid={!!errors.images}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.images}
                        </Form.Control.Feedback>
                    </Form.Group> 
                    <Button
                        disabled={spin}
                        className="mt-3 mr-2 w-25"
                        variant='outline-secondary'
                        onClick={()=>setPostComment(false)}
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
        </Modal.Footer>
        </Modal>
    )
}

export default Comment;