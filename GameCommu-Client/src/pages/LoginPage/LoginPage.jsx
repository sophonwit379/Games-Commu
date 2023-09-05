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
    username: yup.string().required(),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[A-Za-z]/, 'Password requires at least one letter')
      .required(),
  });

  const initialValues = {
      username: '',
      password: '',
  };

  const onSubmit = () => {
    navigate("/home");
  }

  

  return (
    <Formik 
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({handleSubmit, handleChange, values, errors}) => (
        <Container style={{marginTop:'8rem'}} className='h-50 d-flex justify-content-center'>
          <Row className="w-50 item flex-column align-self-center">
            <Col>
              <Card>
                <Card.Body className="mt-3 d-flex flex-column ">
                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-4"
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
                    <FloatingLabel controlId="floatingPassword" label="Password">
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
                        Login
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