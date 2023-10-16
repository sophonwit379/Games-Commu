/* eslint-disable react/prop-types */
import { Button,Modal,Container,Spinner } from "react-bootstrap";
import { useState } from "react";
import { useRemovePostMutation,setData } from "../store";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { postApi } from "../store/apis/postApi";
import { postByGameApi } from "../store/apis/postByGameApi";
import { imageApi } from "../store/apis/imageApi";

function ConfirmRemovePost({show,onHide,pid,setPage}) {
    const dispatch = useDispatch();
    const [ removePost ] = useRemovePostMutation();
    const [spin,setSpin] = useState();

    const handleRemove = async () => {
        setPage(0);
        setSpin(true);
        await removePost(pid);
        dispatch(setData([]));
        dispatch(postApi.util.resetApiState());
        dispatch(postByGameApi.util.resetApiState());
        dispatch(imageApi.util.resetApiState());
        setSpin(false);
        toast.success('ลบโพสต์สำเร็จ', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        });
        onHide();
    }

    return (
        <Modal  
            show={show}
            centered
            scrollable
        >
            <Modal.Body>
                <h5 className="p-4 d-flex justify-content-center">
                    คุณแน่ใจใช่ไหมว่าต้องการลบโพสต์นี้
                </h5>
                <div className="d-flex justify-content-center mt-3 w-100 pb-3">
                    <Button 
                        className="w-25 mr-3" 
                        variant="outline-secondary"
                        disabled={spin}
                        onClick={()=>onHide()}
                    >
                        ยกเลิก
                    </Button>
                    <Button 
                        className="w-25 mr-3" 
                        variant="outline-danger"
                        disabled={spin}
                        onClick={handleRemove}
                    >
                        {!spin? "ตกลง":                                    
                            <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmRemovePost;