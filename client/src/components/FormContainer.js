import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center ">
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormContainer;
