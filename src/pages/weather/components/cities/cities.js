import { Container, Col, Row, Button, Spinner } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import './cities.css';
import { useSelector, useDispatch } from 'react-redux';
import City from "./components/city/city";

function Cities(){

    var dataState = useSelector((state) => state.dataPack.dataSet);

    return(
        <div>
            <div className="search-box">
       
                    <Row  className="justify-content-md-center">
                        <Col xs={10} md={3}>
                            <Form>
                                <Form.Group className="d-flex" controlId="formBasicEmail">
                                    <Form.Control className="col-4" type="text" placeholder="Enter a city" />
                                    <Button  className="col-4 btn-search">Add City</Button>
                                </Form.Group>
                            </Form>

        
                        </Col>
                    </Row>
         
            </div>

            <div className="weather-cards">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={9}>
                        <Row className="d-flex">

                            {dataState != null ? (
                            dataState.map((dat) => (
                                <>
                                    {/* {console.log(dat) } */}
                                    {console.log(dat)}
                                    <City key={dat.id} id={dat.id} name={dat.name} weather={dat.weather} date={dat.dt} temp={dat.main.temp} 
                                    humidity={dat.main.humidity} pressure={dat.main.pressure} maxtemp={dat.main.temp_max} 
                                    mintemp={dat.main.temp_min} visibility={dat.visibility} wind={dat.wind.speed} 
                                    sunrise={dat.sys.sunrise} country={dat.sys.country} sunset={dat.sys.sunset} speeddeg={dat.wind.deg}/>
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