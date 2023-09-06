import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import useTogglePassword from '../../hooks/use-toggle-password';
import { 
  FloatingLabel,
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
  InputGroup
} from "react-bootstrap";


function Register() {
  const { showPwd,togglePwd } = useTogglePassword();
  const navigate = useNavigate();
  const { Formik } = formik;

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(8, 'ชื่อผู้ใช้งานต้องมีอย่างน้อย 8 ตัว')
      .required('กรุณากรอกชื่อผู้ใช้งาน'),
    email: yup.string().email('กรุณากรอกอีเมล์ให่้ถูกต้อง').required('กรุณากรอกอีเมล์'),
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
      username: '',
      email:'',
      password: '',
      confirmPassword:'',
  };

  const onSubmit = () => {
    navigate('/login');
  }

    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}       
      >
        {({handleSubmit,handleChange,values, errors}) => (
          <Container style={{minHeight:'75vh'}} className='d-flex justify-content-center'>
            <Row className='w-50 align-self-center'>
              <Col className="d-flex flex-column align-items-center"> 
                <Card className='w-100'>
                  <Card.Body>
                    <Form noValidate onSubmit={handleSubmit} >
                      <FloatingLabel controlId="username" label="ชื่อผู้ใช้งาน" className="mb-5"
                      >
                        <Form.Control 
                          placeholder="username007"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid" className='position-absolute'>
                          {errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      <FloatingLabel controlId="email" label="อีเมล์" className="mb-5">
                          <Form.Control 
                            type="email" 
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email} 
                          />
                        <Form.Control.Feedback type="invalid" className='position-absolute'>
                          {errors.email}
                        </Form.Control.Feedback>                        
                      </FloatingLabel>
                      <InputGroup className="mb-5">
                      <FloatingLabel controlId="floatingPassword" label="รหัสผ่าน">
                          <Form.Control 
                            type={showPwd ? 'text' : 'password'} 
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password} 
                          />
                        <Form.Control.Feedback type="invalid" className="position-fixed">
                          {errors.password}
                        </Form.Control.Feedback>
                        
                      </FloatingLabel>
                      <Button
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
                        <Form.Control.Feedback type="invalid" className="position-fixed">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                        
                      </FloatingLabel>
                      <Button
                        variant="outline-secondary"
                        onClick={togglePwd}
                      >
                        {showPwd ? <AiFillEyeInvisible/> : <AiFillEye/>}
                      </Button>
                    </InputGroup>
                      <Button 
                        className="mt-4 w-100" 
                        variant="secondary"
                        type="submit"
                        >
                          สมัคร
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}

      </Formik>
    )
  }
  
  export default Register;