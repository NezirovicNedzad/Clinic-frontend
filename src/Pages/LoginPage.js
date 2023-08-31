import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/korisniciActions";

import "../styles/loginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [count, SetCount] = useState(0);

  const dispatch = useDispatch();

  const korisnickiLogin = useSelector((state) => state.korisnickiLogin);

  const { userInfo,success } = korisnickiLogin;

  const navigate = useNavigate();
  const redirect='/profil'
  useEffect(() => {


if(userInfo)
{
  navigate("/odeljenja");
}

  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
if(success){
    navigate("/odeljenja");
    }  };

  return (
    <Container fluid>
      <FormContainer>
        <h1 style={{ color: "#111", textAlign: "center" }}>Prijavi se</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label className='labelLoginP'>Email Adresa</Form.Label>
            <Form.Control
              className='formControlLoginP'
              type='email'
              name='email'
              placeholder='Email..'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='labelLoginP'>Lozinka</Form.Label>
            <Form.Control
              className='formControlLoginP'
              type='password'
              placeholder='Lozinka..'
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className='dugme mt-4' type='submit' name='log'>
            Prijavi se
          </Button>
          <Row className='py-3'>
          <Col>
        
        
          </Col>
         
        </Row>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
