/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form  from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import * as formik from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

function Post(props) {
    const { Formik } = formik;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 10MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif','image/jpg'];
    const [preImage, setPreImage] = useState([]);
    
    useEffect(() => {
        console.log("re")
    },[preImage]);

    const imageSchema = yup.object().shape({
        textA: yup.string().required('กรุณาพิมพ์ข้อความ'),
        images: yup.array()
        .of(
        yup.mixed()
            .required('Please select an image')
            .test(
            'fileSize',
            'ขนาดไฟล์ต้องน้อยกว่า 10MB',
            (value) => value && value.size <= MAX_FILE_SIZE 
            )
            .test(
            'fileType',
            'รองรับไฟล์ JPEG , PNG, JPG, หรือ GIF เท่านั้น',
            (value) =>
                value &&
                ALLOWED_FILE_TYPES.includes(value.type)
            )
        ),
    });

    const handleSubmit = (e) => {
        console.log(e)
        URL.revokeObjectURL(e.images)
        console.log(e)
        props.onHide()
    }

    return (
        <Formik
            initialValues = {{
                textA:'',
                images: [],
            }}
            validationSchema={imageSchema}
            onSubmit={handleSubmit}
        >
            {({handleSubmit,handleChange, setFieldValue,values, errors}) => (
                <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        สร้างโพสต์
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate onSubmit={handleSubmit} className='d-flex flex-column'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control 
                                    as="textarea" 
                                    name="textA" 
                                    placeholder='พิมข้อความ' 
                                    rows={4}
                                    value={values.textA}
                                    onChange={handleChange}
                                    isInvalid={!!errors.textA} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.textA}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Upload รูปภาพ</Form.Label>
                                <Form.Control 
                                    as="input"
                                    type="file"
                                    name="images"
                                    onChange={(event) => {
                                        const filesArray = Array.from(event.currentTarget.files);
                                        setFieldValue('images', filesArray);
                                        setPreImage(filesArray.map((file) => URL.createObjectURL(file)));
                                    }}
                                    isInvalid={!!errors.images}
                                    multiple 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.images}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {values.images.length > 0 && preImage.map((image,id) => {
                                    {console.log(image)}
                                    <Image key={id} src={image} width={300} height={250} alt='image-upload' />
                                })
                            }
                            <Button className='w-25 mt-2 mb-2 align-self-end' variant='outline-secondary' type='submit'>โพสต์</Button>
                        </Form>                                   
                    </Modal.Body>                    
                </Modal>
            )} 
        </Formik>
    );
}

export default Post;