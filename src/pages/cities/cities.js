import React from 'react';
import {Container, Col, Row, Button, Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './cities.css';
import City from './city/city';
import cityData from '../../json/cities.json';

/**
 * @return {JSX.Element} jsx content to control
 * the main body of the weather page
 */
function Cities() {
  return (
    <div>
      <div className="search-box">
        <Row className="justify-content-center mx-auto">
          <Col xs={11} sm={8} md={6} lg={5} xl={4} >
            <Form>
              <Form.Group className="d-flex" controlId="formBasicEmail">
                {/* eslint-disable-next-line max-len */}
                <Form.Control className="col-4" type="text" placeholder="Enter a city" />
                <Button className="col-4 btn-search">Add City</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="weather-cards">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} sm={12} md={12} lg={10} xl={9}>
              <Row className="d-flex">
                {cityData != null ? (cityData.List.map((dat) => (
                  <Col key={dat.CityCode} xs={12} sm={12} md={12} lg={6}>
                    <City id={dat.CityCode} exp={dat.Exp}/>
                  </Col>
                ))
                ) : (

                  <Col sm={12} md={8} className='city-card'>
                    <Spinner animation="grow" />
                  </Col>
                )
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Cities;
