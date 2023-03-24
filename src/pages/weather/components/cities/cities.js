import React from 'react';
import {Container, Col, Row, Button, Spinner} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './cities.css';
import {useSelector} from 'react-redux';
import City from './city/city';


/**
 * @return {JSX.Element} jsx content to control
 * the main body of the weather page
 */
function Cities() {
  const dataState = useSelector((state) => state.dataPack.dataSet);
  return (
    <div>
      <div className="search-box">

        <Row className="justify-content-md-center mx-auto">
          <Col xs={11} sm={8} md={6} lg={4} xl={3}>
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
                {dataState != null ? (dataState.map((dat) => (
                  <>
                    <City
                      key={dat.id} id={dat.id} name={dat.name}
                      weather={dat.weather} date={dat.dt}
                      temp={dat.main.temp} humidity={dat.main.humidity}
                      pressure={dat.main.pressure} maxtemp={dat.main.temp_max}
                      mintemp={dat.main.temp_min} visibility={dat.visibility}
                      wind={dat.wind.speed} sunrise={dat.sys.sunrise}
                      country={dat.sys.country} sunset={dat.sys.sunset}
                      speeddeg={dat.wind.deg}/>
                  </>
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
};

export default Cities;
