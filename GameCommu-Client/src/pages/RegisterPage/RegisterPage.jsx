import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import useTogglePassword from '../../hooks/use-toggle-password';
import { GrFormNextLink } from "react-icons/gr";
import { setToken, useAddUserMutation, useLoginMutation } from '../../store';
import { useDispatch } from 'react-redux';
import useClearUserToken from '../../hooks/use-clear-user-token';
import { useEffect,useState } from 'react';
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
import './RegisterPage.css'
import { gamesApi } from '../../store/apis/gamesApi';
import { selectGamesApi } from '../../store/apis/selectGamesApi';
import Spinner from 'react-bootstrap/Spinner';

function RegisterPage() {
  const { clear } = useClearUserToken();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { showPwd,togglePwd } = useTogglePassword();
  const navigate = useNavigate();
  const { Formik } = formik;
  const [addUser] = useAddUserMutation();
  const [spin, setSpin] = useState(false); 
  

  useEffect(()=>{
    clear();
  },[clear])

  const validationSchema = yup.object().shape({
    username: yup.string()
      .max(18, 'ชื่อผู้ใช้งานมีได้สูงสุด 18 ตัว')
      .required('กรุณากรอกชื่อผู้ใช้งาน'),
    email: yup.string().email('กรุณากรอกอีเมล์ให่้ถูกต้อง').required('กรุณากรอกอีเมล์'),
    password: yup
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
      .max(20, 'รหัสผ่านมีได้สูงสุด 20 ตัว')
      .matches(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
      .matches(/[A-Za-z]/, 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว')
      .required('กรุณากรอกรหัสผ่าน'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
    .required('กรุณากรอกรหัสผ่านอีกครั้ง'),
    name: yup.string() .required('กรุณากรอกชื่อ'),
    surname: yup.string() .required('กรุณากรอกนามสกุล'),
  });

  const initialValues = {
      username: '',
      email:'',
      password: '',
      confirmPassword:'',
      name:'',
      surname:''
  };

  const onSubmit = async (values) => {
    setSpin(true)
    await addUser(values);
    const user = {
      username: values.email,
      password: values.password
    }
    await login(user)
      .unwrap()
      .then(response =>{
        localStorage.setItem("Token", response);
        dispatch(setToken(response));
      })
      .catch(rejected => {
        let error;
        if(rejected.data?.message){
          error = "Password or username incorrect.";
        }else{
          error = rejected.data;
        }
      });
      setSpin(false);
      dispatch(gamesApi.util.resetApiState());
      dispatch(selectGamesApi.util.resetApiState());
      navigate('/select-game');
  };

    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}       
      >
        {({handleSubmit,handleChange,values, errors}) => (
          <Container id="contain" className='d-flex justify-content-center'>
            <Row className='align-self-center contain-row'>
              <Col className="d-flex flex-column align-items-center"> 
              <h1 className="mb-5">
                Game Commu
              </h1>
                <Card className='w-100'>
                  <Card.Body>
                    <Form noValidate onSubmit={handleSubmit} >
                      <Row>
                        <Col lg>
                          <FloatingLabel controlId="email" label="อีเมล์" className="mb-3">
                              <Form.Control 
                                disabled={spin}
                                autoComplete="email"
                                type="email" 
                                placeholder="Email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email} 
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>                        
                          </FloatingLabel>
                        </Col>
                        <Col>
                          <FloatingLabel controlId="username" label="ชื่อผู้ใช้งาน" className="mb-3">
                            <Form.Control 
                              disabled={spin}
                              autoComplete="username"
                              placeholder="username007"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg>
                          <FloatingLabel controlId="name" label="ชื่อ" className="mb-3">
                            <Form.Control
                              disabled={spin} 
                              autoComplete='name'
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
                        </Col>
                        <Col>
                          <FloatingLabel controlId="surname" label="นามสกุล" className="mb-3">
                            <Form.Control
                              disabled={spin} 
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
                        </Col>
                      </Row>
                      <Row>
                        <Col lg>
                          <InputGroup className="mb-5">
                            <FloatingLabel controlId="floatingPassword" label="รหัสผ่าน">
                              <Form.Control
                                disabled={spin} 
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
                              disabled={spin} 
                              id='bt'
                              variant="outline-secondary"
                              onClick={togglePwd}
                            >
                              {showPwd ? <AiFillEyeInvisible/> : <AiFillEye/>}
                            </Button>
                          </InputGroup>
                        </Col>
                        <Col>
                          <InputGroup className="mb-4">
                            <FloatingLabel controlId="confirmPassword" label="รหัสผ่านอีกครั้ง">
                                <Form.Control
                                  disabled={spin} 
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
                        </Col>
                      </Row>
                      <Button 
                        id='bt-next'
                        className="w-100 d-flex flex-row justify-content-center align-items-center" 
                        variant="secondary"
                        type="submit"
                        disabled={spin}
                        >
                          {!spin? <> ถัดไป <GrFormNextLink size={25} id='next-icon' /></>:                                    
                              <Spinner style={{height:'1.4rem',width:'1.4rem'}} animation="border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                              </Spinner>
                          }
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
  
  export default RegisterPage;