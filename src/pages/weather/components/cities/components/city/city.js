import { Card, Col } from "react-bootstrap";
import "./city.css";
import Wind from "../../../../../../assets/img/wind.png";
import Close from "../../../../../../assets/img/close.png";
import Weatherdesc from "./components/weatherdesc";

function City(props){

    var sunrise = props.sunrise;
    var sunset = props.sunset;
    var citydate = props.date;


    //sunrise
    sunrise  = new Date(sunrise * 1000); // multiply by 1000 to convert to milliseconds
    var sunrisehours = sunrise.getHours();
    var sunriseminutes = sunrise.getMinutes();
    var sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
    var sunriseFormattedTime = `${sunrisehours % 12 || 12}:${sunriseminutes < 10 ? '0' : ''}${sunriseminutes}${sunriseampm}`;
  

    //sunset
    sunset  = new Date(sunset * 1000); // multiply by 1000 to convert to milliseconds
    var sunsethours = sunset.getHours();
    var sunsetminutes = sunset.getMinutes();
    var sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
    var sunsetFormattedTime = `${sunsethours % 12 || 12}:${sunsetminutes < 10 ? '0' : ''}${sunsetminutes}${sunsetampm}`;
    

    //citydate
    citydate  = new Date(citydate * 1000); // multiply by 1000 to convert to milliseconds
    var citydatehours = citydate.getHours();
    var citydateminutes = citydate.getMinutes();
    
    var month = citydate.toLocaleString('default', { month: 'short' });
    var day = citydate.getDate();
    var citydateampm = citydatehours >= 12 ? 'pm' : 'am';
    var citydateFormattedTime = `${citydatehours % 12 || 12}:${citydateminutes < 10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `;
    
    return(
        
            <Col md={6}>
                <Card className="city-card">
                    <div className="card-top" style={{backgroundColor: "#2d813f"}}>

                        <div className="close-bar">
                            <div className="close">
                                <img src={Close}/>
                            </div>
                        </div>
                        <div className="card-top-marg  d-flex">
                            <Col className="town">
                                <h4 className="txt-location">{props.name}, {props.country}</h4>
                                <p>{citydateFormattedTime}</p>

                                <div>
                                    {props.weather.map((dat) => (
                                        <Weatherdesc desc={dat.description}/>
                                    ))}
                                    
                                </div>
                            </Col>

                            <Col>
                                <h3 className="txt-temp">{Math.round(props.temp)}°<span className="txt-celc">C</span></h3>
                                <p className="no-bot-mar small-p">Temp Min: {Math.round(props.mintemp)}°c</p>
                                <p className="no-bot-mar small-p">Temp Max: {Math.round(props.maxtemp)}°0c</p>
                            </Col>
                        </div>


                    </div>

                    <div className="card-bot d-flex">

                        <Col className="small-p left-align">
                            
                            <p className="no-bot-mar"><span className="info-type">Pressure: </span>{props.pressure} hPa</p>
                            <p className="no-bot-mar"><span className="info-type">Humidity: </span>{props.humidity}%</p>
                            <p className="no-bot-mar"><span className="info-type">Visibility: </span>{props.visibility/1000}km</p>

                           
                        </Col>

                        <div className="line"></div>

                        <Col className="small-p ">
                            <div>
                                <img src={Wind} className="wind-ico"/>
                            </div>
                            <p className="no-bot-mar">{props.wind}m/s {props.speeddeg}Degree</p>
                        </Col>

                        <div className="line"></div>

                        <Col className="small-p justify-content-md-center">
                            <div>
                                <p className="no-bot-mar"><span className="info-type">Sunrise: </span>{sunriseFormattedTime}</p>
                                <p className="no-bot-mar"><span className="info-type">Sunset: </span> {sunsetFormattedTime}</p>     
                                <p className="no-bot-mar"><span className="info-type">ID: </span> {props.id}</p>     

                            </div>
                        </Col>

                    </div>

                </Card>
            </Col>
            
        
    )

}

export default City;