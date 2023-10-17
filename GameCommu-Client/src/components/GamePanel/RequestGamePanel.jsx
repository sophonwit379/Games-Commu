/* eslint-disable react/prop-types */
import { Button,Modal,Spinner,Form } from "react-bootstrap";
import { useState } from "react";
import { useAddRequestMutation } from "../../store";
import { toast } from 'react-toastify';
import * as formik from 'formik';
import * as yup from 'yup';

function RequestGamePanel({show,onHide,reportFormRef}) {
    const [addRequestGame] = useAddRequestMutation();
    const [spin,setSpin] = useState();
    const { Formik } = formik;

    const requestSchema = yup.object().shape({
        name: yup.string().required('กรุณาพิมพ์ชื่อเกม'),
        year: yup
            .number()
            .integer('ปีต้องเป็นจำนวนเต็ม')
            .min(1000, 'ปีต้องมี 4 ตัวเท่านั้น')
            .max(9999, 'ปีต้องไม่เกิน 4 ตัว')
            .required('กรุณาพิมพ์ชื่อปี'),
    });

    const handleSubmit = async (value) => {
        const request = {
            name:value.name,
            year:value.year
        }
        setSpin(true);
        await addRequestGame(request);
        setSpin(false);
        toast.success('ส่งคำขอสำเร็จ', {
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
            initialValues = {{name:'',year:''}}
            validationSchema={requestSchema}
            onSubmit={handleSubmit}
            innerRef={reportFormRef}
        >
        {({handleSubmit, handleChange,values, errors}) => (
            <Modal  
                show={show}
                centered
                scrollable
            >
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column'>
                        <Form.Group controlId="floatingTextarea2" label="ชื่อเกม" className="px-3 py-2">
                            <Form.Label>ชื่อเกม</Form.Label>
                            <Form.Control
                                disabled={spin}
                                as="input" 
                                name="name" 
                                placeholder='game name' 
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="floatingTextarea2" label="ปี" className="px-3 py-2">
                            <Form.Label>ปี</Form.Label>
                            <Form.Control
                                disabled={spin}
                                as="input" 
                                name="year" 
                                placeholder='ex. 2014' 
                                value={values.year}
                                onChange={handleChange}
                                isInvalid={!!errors.year} 
                                type="number"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
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

export default RequestGamePanel;