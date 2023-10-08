import { Card, Container,Image,Form,FloatingLabel,Button } from "react-bootstrap";
import default_pfp from '../../assets/default_pfp.svg'
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './SettingPage.css';
import { useFetchUserQuery } from '../../store';
import { useEditUserMutation } from "../../store";
import { useDispatch } from "react-redux";
import { userApi } from "../../store/apis/userApi";
import { useEffect } from "react";

function SettingPage() {
    const dispatch = useDispatch();
    const [ update ] = useEditUserMutation();
    const { data,isFetching } = useFetchUserQuery();
    const [edit,setEdit] = useState(true);
    const { Formik } = formik;
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        username: yup.string().max(18, 'ชื่อผู้ใช้งานมีได้สูงสุด 18 ตัว').required('กรุณากรอกชื่อผู้ใช้งาน'),
        name: yup.string() .required('กรุณากรอกชื่อ'),
        surname: yup.string() .required('กรุณากรอกนามสกุล'),
    });

    let content;
    if(isFetching){
        content = <h3>Loading.......</h3>
    }else{
        const onSubmit = async (user) => {
            console.log(user);
            await update(user);
            dispatch(userApi.util.resetApiState());
            setEdit(!edit)
        };
    
        content =                     
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    username: data?.username,
                    name: data?.name,
                    surname: data?.surname
                }}
                onSubmit={onSubmit}
                validateOnBlur={false}       
            >
                {({handleSubmit,handleChange,resetForm,values, errors}) => (
                    <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column">
                        <FloatingLabel controlId="floatingUsername" label="ชื่อผู้ใช้งาน" className="mb-3">
                                <Form.Control 
                                    autoComplete="username"
                                    disabled={edit}
                                    placeholder="username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isInvalid={!!errors.username} 
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="name" label="ชื่อ" className="mb-3">
                                <Form.Control 
                                    autoComplete="name"
                                    disabled={edit}
                                    placeholder="name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name} 
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="surname" label="นามสกุล">
                                <Form.Control 
                                    disabled={edit}
                                    placeholder="surname"
                                    name="surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                    isInvalid={!!errors.surname} 
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.surname}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <Container id="con-bt" className="mt-4 d-flex justify-content-center" fluid>
                            <Button
                                className="mr-3 w-25 bt"
                                variant="outline-secondary" 
                                onClick={ ()=>{
                                    if(edit){
                                        navigate('/home')
                                    }else{
                                        setEdit(!edit)
                                        resetForm();
                                    }
                                }}
                            >
                                {edit?'ย้อนกลับ':'ยกเลิก'}
                            </Button>
                            {edit?<Button  
                                className="w-25 bt" 
                                variant="outline-secondary" 
                                onClick={ event => {
                                    event.preventDefault();
                                    setEdit(false);
                                }}
                            >
                                แก้ไข
                            </Button>
                            :
                            <Button  
                                className="w-25 bt" 
                                variant="outline-secondary" 
                                type='submit'
                            >
                                ยืนยัน
                            </Button>}
                        </Container>
                    </Form>
                )}
            </Formik>
    }

    return (
        <Container className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center main">
            <Card className="mb-5 p-3 width">
                <Container className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <Image src={default_pfp} width={200} alt="profile-image" roundedCircle/>
                </Container>
                <Card.Body className="p-4 w-100">
                    {content}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SettingPage;