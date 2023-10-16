/* eslint-disable react/prop-types */
import { Button,Modal,Spinner,Form,FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import { useEditPostMutation,setData,useAddReportMutation } from "../store";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { postApi } from "../store/apis/postApi";
import { postByGameApi } from "../store/apis/postByGameApi";
import { imageApi } from "../store/apis/imageApi";
import * as formik from 'formik';
import * as yup from 'yup';

function ReportPost({show,onHide,pid,reportFormRef}) {
    const dispatch = useDispatch();
    const [spin,setSpin] = useState();
    const { Formik } = formik;
    const [ addReport ] = useAddReportMutation();

    const imageSchema = yup.object().shape({
        reason: yup.string().required('กรุณาพิมพ์ข้อความ'),
    });

    const handleEdit = async (value) => {
        const report = {
            pid,
            reason:value.reason
        }
        setSpin(true);
        await addReport(report);
        setSpin(false);
        toast.success('รายงานสำเร็จ', {
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
            initialValues = {{reason:''}}
            validationSchema={imageSchema}
            onSubmit={handleEdit}
            innerRef={reportFormRef}
        >
        {({handleSubmit,resetForm, handleChange,values, errors}) => (
            <Modal  
                show={show}
                centered
                scrollable
            >
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column'>
                        <Form.Group controlId="floatingTextarea2" label="ข้อความที่จะรายงาน" className="m-3">
                            <Form.Control
                                disabled={spin}
                                as="textarea" 
                                name="reason" 
                                placeholder='ข้อความที่จะรายงาน' 
                                value={values.reason}
                                onChange={handleChange}
                                isInvalid={!!errors.reason} 
                                style={{ height: '150px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.reason}
                            </Form.Control.Feedback>
                        </Form.Group>
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

export default ReportPost;