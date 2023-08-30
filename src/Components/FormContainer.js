import React from 'react'
import { Col,Row,Container } from 'react-bootstrap'
const FormContainer = ({children}) => {
    return (
     <Container style={{paddingTop:'100px'}}>
         <Row className="justify-content-md-center">

         <Col style={{padding:"0.4rem 1.9rem"}} xs={12} md={6}>
             {children}
        </Col>
         </Row>
     </Container>
    )
}

export default FormContainer
