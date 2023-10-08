import { useNavigate } from "react-router-dom";
import useTogglePassword from "../../hooks/use-toggle-password";
import * as formik from 'formik';
import * as yup from 'yup';
import { AiFillEye,AiFillEyeInvisible } from "react-icons/ai";
import { setToken, useLoginMutation } from "../../store";
import { 
  FloatingLabel,
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import useClearUserToken from '../../hooks/use-clear-user-token';
import { useEffect } from "react";
import './LoginPage.css'

function LoginPage() {
  const { showPwd,togglePwd } = useTogglePassword();
  const navigate = useNavigate();
  const { Formik } = formik;
  const [login] = useLoginMutation();

  const { clear } = useClearUserToken();

  useEffect(()=>{
    clear();
  },[clear])

  const validationSchema = yup.object().shape({
    email: yup.string().email('กรุณากรอกอีเมล์ให่้ถูกต้อง').required('กรุณากรอกอีเมล์'),
    password: yup
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
      .matches(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
      .matches(/[A-Za-z]/, 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว')
      .required('กรุณากรอกรหัสผ่าน'),
  });
  const dispatch = useDispatch();

  const initialValues = {
      email: '',
      password: '',
  };


  const onSubmit = async (user) => {
   await login(user)
      .unwrap()
      .then(response =>{
        localStorage.setItem("Token", response);
        dispatch(setToken(response));
        navigate("/home");
        toast.success('เข้าสู่ระบบสำเร็จ', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(rejected => {
        let error;
        if(rejected.data?.message){
          error = "Password or username incorrect.";
        }else{
          error = rejected.data;
        }
        toast.error(error, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: "light",
        });
      }
    );
  }

  

  return (
    <Formik 
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({handleSubmit, handleChange, values, errors}) => (
        <Container id="contain" className='d-flex justify-content-center'>
          <Row className="align-self-center contain-row">
            <Col className="d-flex flex-column align-items-center">
              <h1 className="mb-5">
                Game Commu
              </h1>
              <Card id="contain-card">
                <Card.Body className="mt-3 d-flex flex-column ">
                  <Form noValidate onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="อีเมล์" className="mb-3"
                    >
                      <Form.Control 
                        autoComplete="email"
                        placeholder="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <InputGroup className="mb-3">
                      <FloatingLabel controlId="floatingPassword" label="รหัสผ่าน">
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
                        id="bt"
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
                        เข้าสู่ระบบ
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

export default LoginPage;