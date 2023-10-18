import {React, useState} from "react";
import * as formik from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useAddGameMutation, useGetGamesQuery } from "../../store/apis/gamesApi";
import { toast } from "react-toastify";

function AddGameItem() {
  const { Formik } = formik;
  const [spin, setSpin] = useState();

  const schema = yup.object().shape({
    name: yup.string().required(),
    year: yup.string().required(),
    file: yup.mixed().required(),
  });
  const { data: games} = useGetGamesQuery();
  const [addGame] = useAddGameMutation();
  const handleEdit = async (values) => {
    const data = {
      name: values.name,
      year: values.year,
    };
    console.log(data);
    try {
      console.log(games);
      for(let i in games){
        if(data.name===games[i].name){
          toast.error("มีเกมนี้อยู่แล้ว", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
          });
          return console.log('Game Already Exited');
        }else{
          console.log(games[i].name);
        }
      }
      setSpin(true);
      addGame(data);
      setSpin(false);
      toast.success("รายงานสำเร็จ", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const startYear = 1962;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleEdit}
      initialValues={{
        name: "",
        year: 2023,
        file: null,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik101"
              className="position-relative"
            >
              <Form.Label>Game Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              controlId="validationFormik102"
              className="position-relative"
            >
              <Form.Label>Year</Form.Label>
              <Form.Select
                value={values.year}
                name="year"
                onChange={handleChange}
                isInvalid={!!errors.year}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="position-relative mb-3">
              <Form.Label>File</Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={handleChange}
                isInvalid={!!errors.file}
              />
            </Form.Group>
          </Row>

          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddGameItem;
