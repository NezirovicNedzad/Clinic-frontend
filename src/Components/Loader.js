import React from "react";
import { Container, Spinner } from "react-bootstrap";
const Loader = ({ message = "Učitavanje" }) => {
  return (
    <Container fluid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner
          animation='border'
          role='status'
          style={{
            width: "100px",
            height: "100px",
            display: "block",
          }}
        >
          <span className='sr-only'>{message}</span>
        </Spinner>
      </div>
    </Container>
  );
};

export default Loader;
