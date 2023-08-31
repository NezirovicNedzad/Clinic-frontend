import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Not Found</h2>
            <p>Stranica nije pronadjena</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link to='/'>
              <Button>Return to home page</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
