/* eslint-disable react/prop-types */
import { Button,Modal,Spinner,Form,FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useEditPostMutation,setData } from "../store";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { postApi } from "../store/apis/postApi";
import { postByGameApi } from "../store/apis/postByGameApi";
import { imageApi } from "../store/apis/imageApi";
import * as formik from 'formik';
import * as yup from 'yup';

function ConfirmEditPost({show,onHide,pid,pageNumber,setPage,detail}) {
    const dispatch = useDispatch();
    const [ editPost ] = useEditPostMutation();
    const [spin,setSpin] = useState();
    const { Formik } = formik;


    const imageSchema = yup.object().shape({
        detail: yup.string().required('กรุณาพิมพ์ข้อความ'),
    });

    const handleEdit = async (value) => {
        const postData = {
            pid,
            detail:value.detail
        }
        setPage(0);
        setSpin(true);
        await editPost(postData);
        dispatch(setData([]));
        dispatch(postApi.util.resetApiState());
        dispatch(postByGameApi.util.resetApiState());
        dispatch(imageApi.util.resetApiState());
        setSpin(false);
        toast.success('แก้ไขโพสต์สำเร็จ', {
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
        <Formik
            initialValues = {{detail:detail}}
            validationSchema={imageSchema}
            onSubmit={handleEdit}
        >
        {({handleSubmit,resetForm, handleChange,values, errors}) => (
            <Modal  
                show={show}
                centered
                scrollable
            >
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column'>
                        <Form.Group controlId="floatingTextarea2" label="ข้อความที่จะแก้ไข" className="m-3">
                            <Form.Control
                                disabled={spin}
                                as="textarea" 
                                name="detail" 
                                placeholder='พิมข้อความ' 
                                value={values.detail}
                                onChange={handleChange}
                                isInvalid={!!errors.detail} 
                                style={{ height: '150px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.detail}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-3 w-100 pb-3">
                            <Button 
                                className="w-25 mr-3" 
                                variant="outline-secondary"
                                disabled={spin}
                                onClick={()=>{
                                    onHide();
                                    resetForm();
                                }}
                            >
                                ยกเลิก
                            </Button>
                            <Button 
                                className="w-25 mr-3" 
                                variant="outline-secondary"
                                disabled={spin}
                                type="submit"
                            >
                                {!spin? "ตกลง":                                    
                                    <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                }
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )}
        </Formik>
    )
}

export default ConfirmEditPost;