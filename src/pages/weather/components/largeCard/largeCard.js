import { Card, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { selectlocation } from '../../../../redux/switcherSlice';
import Back from "../../../../assets/img/back.png";
import Wind from "../../../../assets/img/wind.png";
import Weatherdesc from "../../../../components/weatherdesc/weatherdesc";
import './largeCard.css';
import Weatherdesc2 from "../../../../components/weatherdesc/weatherdesc2";


function LargeCard(props){
    const dispatch = useDispatch();

    const backBtn = () =>{
        dispatch(selectlocation(null));
    }

    var id = props.location;
    var dataState = useSelector((state) => state.dataPack.dataSet);

    if(dataState!=null){
    for (let i=0; i<dataState.length; i++){
        if (dataState[i].name === id){
            dataState = dataState[i];
        }
    }
    console.log(dataState.name);


    
    var sunrise = dataState.sys.sunrise;
    var sunset = dataState.sys.sunset;
    var citydate = dataState.dt;


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
    

    //wind degree
    var winddegree = {transform: `rotate(${dataState.wind.deg - 45}deg)`};
    console.log(winddegree);

    //random dark color generator
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    // var randomColor = {backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`};
    var randomColor = {backgroundColor: `${color}`};

    }


    
    return(
        <Row className="justify-content-md-center upper-root">
            <Col md={6}  className="justify-content-md-center">
                <Card className="city-card">
                    <div className="large-card-top" style={randomColor}>

                        <div className="close-bar">
                            <div className="back" onClick={backBtn}>
                                <img src={Back}/>
                            </div>
                        </div>

                        <div className="card-root2">
                            <h4 className="txt-location">{dataState.name}, {dataState.country}</h4>
                            <p>{citydateFormattedTime}</p>
                        </div>
                        <Row className="justify-content-md-center">
                            <div className="card-top-marg col-md-8 d-flex">
                                <Col className="town">
                                    

                                    <div>
                                        {dataState.weather.map((dat) => (
                                            <Weatherdesc2 desc={dat.description}/>
                                        ))}
                                        
                                    </div>
                                </Col>
                                <div className="line2"></div>
                                <Col>
                                    <h3 className="txt-temp2">{Math.round(dataState.main.temp)}°<span className="txt-celc">C</span></h3>
                                    <p className="no-bot-mar small-p">Temp Min: {Math.round(dataState.main.temp_min)}°c</p>
                                    <p className="no-bot-mar small-p">Temp Max: {Math.round(dataState.main.temp_max)}°0c</p>
                                </Col>
                            </div>
                        </Row>


                    </div>

                    <div className="card-bot d-flex">

                        <Col className="small-p left-align">
                            
                            <p className="no-bot-mar"><span className="info-type">Pressure: </span>{dataState.main.pressure} hPa</p>
                            <p className="no-bot-mar"><span className="info-type">Humidity: </span>{dataState.main.humidity}%</p>
                            <p className="no-bot-mar"><span className="info-type">Visibility: </span>{dataState.visibility/1000}km</p>

                           
                        </Col>

                        <div className="line"></div>

                        <Col className="small-p ">
                            <div>
                                <img src={Wind} style={winddegree} className="wind-ico"/>
                            </div>
                            <p className="no-bot-mar">{dataState.wind.speed}m/s {dataState.wind.deg}Degree</p>
                        </Col>

                        <div className="line"></div>

                        <Col className="small-p justify-content-md-center">
                            <div>
                                <p className="no-bot-mar"><span className="info-type">Sunrise: </span>{sunriseFormattedTime}</p>
                                <p className="no-bot-mar"><span className="info-type">Sunset: </span> {sunsetFormattedTime}</p>     
                                <p className="no-bot-mar"><span className="info-type">ID: </span> {dataState.id}</p>     

                            </div>
                        </Col>

                    </div>

                </Card>
            </Col>
        </Row>
    )
}

export default LargeCard;