import { Card, Container,Image,InputGroup,Form,FloatingLabel,Button } from "react-bootstrap";
import default_pfp from '../../assets/default_pfp.svg'
import useTogglePassword from '../../hooks/use-toggle-password';
import * as formik from 'formik';
import * as yup from 'yup';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import './SettingPage.css';

function SettingPage() {
    const { Formik } = formik;
    const { showPwd,togglePwd } = useTogglePassword();
    const navigate = useNavigate();
    const username = 'Nameless';

    const validationSchema = yup.object().shape({
        password: yup
          .string()
          .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
          .matches(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
          .matches(/[A-Za-z]/, 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว')
          .required('กรุณากรอกรหัสผ่าน'),
        confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
        .required('กรุณากรอกรหัสผ่านอีกครั้ง'),
      });
    
    const initialValues = {
        password: '',
        confirmPassword:'',
    };

    
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Container className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center main">
            <Card className="mb-5 p-3">
                <Container className="d-flex flex-row align-items-center mt-3">
                    <Image src={default_pfp} className="w-50" alt="profile-image" roundedCircle/>
                    <h3 className="ml-3">{username}</h3>
                </Container>
                <Card.Body>
                    <h4 className="mb-4">เปลี่ยนรหัสผ่าน</h4>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validateOnBlur={false}       
                    >
                        {({handleSubmit,handleChange,values, errors}) => (
                        <Form noValidate onSubmit={handleSubmit} className="d-flex flex-column">
                            <InputGroup className="mb-5">
                                <FloatingLabel controlId="floatingPassword" label="รหัสผ่านใหม่">
                                    <Form.Control 
                                    type={showPwd ? 'text' : 'password'} 
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isInvalid={!!errors.password} 
                                    />
                                <Form.Control.Feedback type="invalid" className="position-absolute">
                                    {errors.password}
                                </Form.Control.Feedback>
                                
                                </FloatingLabel>
                                <Button 
                                    id='bt'
                                    variant="outline-secondary"
                                    onClick={togglePwd}
                                >
                                {showPwd ? <AiFillEyeInvisible/> : <AiFillEye/>}
                                </Button>
                            </InputGroup>
                            <InputGroup className="mb-4">
                                <FloatingLabel controlId="confirmPassword" label="รหัสผ่านอีกครั้ง">
                                    <Form.Control 
                                    type={showPwd ? 'text' : 'password'} 
                                    placeholder="confirmPassword"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword} 
                                    />
                                <Form.Control.Feedback type="invalid" className="position-absolute">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
                                </FloatingLabel>
                            </InputGroup>
                            <Container className="mt-4 d-flex justify-content-center" fluid>
                                <Button
                                    className="mr-3 w-25"
                                    variant="outline-secondary" 
                                    onClick={ ()=> navigate('/home')}
                                >
                                    ยกเลิก
                                </Button>
                                <Button  
                                    className="w-25" 
                                    variant="outline-secondary" 
                                    type="submit"
                                >
                                    ยืนยัน
                                </Button>
                            </Container>
                        </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SettingPage;