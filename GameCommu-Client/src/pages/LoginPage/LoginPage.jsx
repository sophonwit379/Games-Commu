import { useNavigate } from "react-router-dom";
import * as formik from 'formik';
import * as yup from 'yup';
import { 
  FloatingLabel,
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";


function LoginPage() {
  const navigate = useNavigate();

  const { Formik } = formik;

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(8, 'ชื่อผู้ใช้งานต้องมีอย่างน้อย 8 ตัว')
      .required('กรุณากรอกชื่อผู้ใช้งาน'),
    password: yup
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
      .matches(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
      .matches(/[A-Za-z]/, 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว')
      .required('กรุณากรอกรหัสผ่าน'),
  });

  const initialValues = {
      username: '',
      password: '',
  };

  const onSubmit = (values) => {
    console.log(values)
    navigate("/home");
  }

  

  return (
    <Formik 
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({handleSubmit, handleChange, values, errors}) => (
        <Container style={{minHeight:'50vh'}} className='d-flex justify-content-center'>
          <Row className="w-50 item flex-column align-self-center">
            <Col className="d-flex flex-column align-items-center">
              <h1 className="mb-5 mt-5">
                Game Commu
              </h1>
              <Card className="w-100">
                <Card.Body className="mt-3 d-flex flex-column ">
                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="ชื่อผู้ใช้งาน" className="mb-4"
                    >
                      <Form.Control 
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
                    <FloatingLabel controlId="floatingPassword" label="รหัสผ่าน">
                        <Form.Control 
                          type="password" 
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password} 
                        />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>                        
                    </FloatingLabel>
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