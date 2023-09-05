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
  email: yup.string().email().required('กรุณากรอกอีเมล์'),
  password: yup
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
    .matches(/[0-9]/, 'รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว')
    .matches(/[A-Za-z]/, 'รหัสผ่านต้องมีตัวอักษรภาษาอังกฤษอย่างน้อย 1 ตัว')
    .required('กรุณากรอกรหัสผ่าน'),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
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
        {({handleSubmit,handleChange,values,touched, errors}) => (
          <Container className='d-flex justify-content-center'>
            <Row>
              <Col> 
                <Card>
                  <Card.Body>

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