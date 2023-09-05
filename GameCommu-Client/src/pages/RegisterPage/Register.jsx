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

const { Formik } = formik;

const validationSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอกชื่อผู้ใช้งาน'),
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

const onSubmit = (values) => {
  console.log(values)
}

function Register() {
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
                      <FloatingLabel controlId="username" label="ชื่อผู้ใช้งาน" className="mb-4"
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
                      <FloatingLabel controlId="email" label="อีเมล์" className="mb-4">
                          <Form.Control 
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
                      <FloatingLabel controlId="password" label="รหัสผ่าน" className='mb-4'>
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
                      <FloatingLabel controlId="confirmPassword" label="กรอกรหัสผ่านอีกครั้ง">
                          <Form.Control 
                            type="password" 
                            placeholder="ConfirmPassword"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPassword} 
                          />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>                        
                      </FloatingLabel>
                      <Button 
                        className="mt-4 w-100" 
                        variant="secondary"
                        type="submit"
                        >
                          ถัดไป
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