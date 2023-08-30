
import React,{useState,useEffect} from "react"
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'


import {useNavigate} from "react-router-dom"
import FormContainer from "../Components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/korisniciActions"







const LoginPage = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [count,SetCount]=useState(0)



    const dispatch=useDispatch();


    const korisnickiLogin=useSelector(state=>state.korisnickiLogin);

    const {userInfo}=korisnickiLogin

const navigate =useNavigate()

  useEffect(()=>{



   
  },[])
  
  
  const submitHandler = (e) =>{
    e.preventDefault()
   
    dispatch(login(email,password));

navigate("/odeljenja");
                             }
    return (
        <FormContainer>
            <h1 style={{color:'#e70b0b'}}>Prijavi se</h1>
         
            <Form onSubmit={submitHandler} >
                   <Form.Group controlId='email'>

                        <Form.Label>Email Adresa</Form.Label>
                        <Form.Control 
                        type='email'
                        name='email'
                        placeholder='vas email..'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} >

                        </Form.Control>
                   </Form.Group>

                   <Form.Group controlId='password'>

                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='vas password..'
                        value={password}
                        name='password'
                        onChange={(e)=>setPassword(e.target.value)} ></Form.Control>
                   </Form.Group>
                    <Button className='dugme' type='submit' name='log' >
                        Prijavi se
                    </Button>

                    <Row className='py-3'>
          <Col>
        
        
          
          </Col>
         
        </Row>
            </Form>
         
        </FormContainer>
    )
}

export default LoginPage
 