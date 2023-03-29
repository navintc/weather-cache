import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import LogoImg from '../../assets/img/Logo.png';

const LogoWeather = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img src={LogoImg} alt="Logo"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogoWeather;
