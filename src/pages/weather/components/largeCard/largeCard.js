import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {selectlocation} from '../../../../redux/switcherSlice';
import Back from '../../../../assets/img/back.png';
import Wind from '../../../../assets/img/wind.png';
import './largeCard.css';
import Weatherdesc2 from '../../../../components/weatherdesc/weatherdesc2';


// eslint-disable-next-line require-jsdoc
function LargeCard(props) {
  const dispatch = useDispatch();

  let citydateFormattedTime = 0;
  let sunsetFormattedTime = 0;
  let sunriseFormattedTime = 0;
  let winddegree = 0;

  const backBtn = () =>{
    dispatch(selectlocation(null));
  };

  // eslint-disable-next-line react/prop-types
  const id = props.location;
  let dataState = useSelector((state) => state.dataPack.dataSet);

  if (dataState!=null) {
    for (let i=0; i<dataState.length; i++) {
      if (dataState[i].name === id) {
        dataState = dataState[i];
      }
    }

    let sunrise = dataState.sys.sunrise;
    let sunset = dataState.sys.sunset;
    let citydate = dataState.dt;


    // sunrise
    // multiply by 1000 to convert to milliseconds
    sunrise = new Date(sunrise * 1000);
    const sunrisehours = sunrise.getHours();
    const sunriseminutes = sunrise.getMinutes();
    const sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
    sunriseFormattedTime = `${sunrisehours % 12 || 12}:${sunriseminutes <
      10 ? '0' : ''}${sunriseminutes}${sunriseampm}`;

    // sunset
    // multiply by 1000 to convert to milliseconds
    sunset = new Date(sunset * 1000);
    const sunsethours = sunset.getHours();
    const sunsetminutes = sunset.getMinutes();
    const sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
    sunsetFormattedTime = `${sunsethours % 12 || 12}:${sunsetminutes <
      10 ? '0' : ''}${sunsetminutes}${sunsetampm}`;


    // citydate
    // multiply by 1000 to convert to milliseconds
    citydate = new Date(citydate * 1000);
    const citydatehours = citydate.getHours();
    const citydateminutes = citydate.getMinutes();

    const month = citydate.toLocaleString('default', {month: 'short'});
    const day = citydate.getDate();
    const citydateampm = citydatehours >= 12 ? 'pm' : 'am';
    citydateFormattedTime = `${citydatehours % 12 || 12}:${citydateminutes <
      10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `;


    // wind degree
    winddegree = {transform: `rotate(${dataState.wind.deg - 45}deg)`};
    console.log(winddegree);
  }

  // random dark color generator
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  // eslint-disable-next-line no-unused-vars
  const randomColor = {backgroundColor: `${color}`};

  return (
    <Row className="justify-content-md-center upper-root">
      <Col xs={11} md={6} className="justify-content-md-center mx-auto">
        <Card className="city-card">
          <div className="large-card-top" style={randomColor}>

            <div className="close-bar">
              <div className="back" onClick={backBtn}>
                <img src={Back}/>
              </div>
            </div>

            <div className="card-root2">
              {/* eslint-disable-next-line max-len */}
              <h4 className="txt-location">{dataState.name}, {dataState.country}</h4>
              <p>{citydateFormattedTime}</p>
            </div>
            <Row className="justify-content-md-center">
              <div className="snap-data-box col-sm-12 col-md-8 d-flex">
                <Col xs={6} className="town">


                  <div>
                    <Weatherdesc2
                      desc={dataState.weather[0].description}/>
                  </div>
                </Col>
                <div className="line2"></div>
                <Col>
                  <h3 className="txt-temp2">
                    {Math.round(dataState.main.temp)}°
                    <span className="txt-celc">C</span>
                  </h3>
                  <p className="no-bot-mar small-p">
                      Temp Min: {Math.round(dataState.main.temp_min)}°c
                  </p>
                  <p className="no-bot-mar small-p">
                      Temp Max: {Math.round(dataState.main.temp_max)}°0c
                  </p>
                </Col>
              </div>
            </Row>


          </div>

          <div className="card-bot d-flex">
            <Col className="small-p left-align">
              <p className="no-bot-mar"><span className="info-type">
                  Pressure: </span>{dataState.main.pressure} hPa</p>
              <p className="no-bot-mar"><span className="info-type">
                  Humidity: </span>{dataState.main.humidity}%</p>
              <p className="no-bot-mar"><span className="info-type">
                  Visibility: </span>{dataState.visibility/1000}km</p>
            </Col>

            <div className="line"></div>

            <Col className="small-p ">
              <div>
                <img src={Wind} style={winddegree} className="wind-ico"/>
              </div>
              <p className="no-bot-mar">
                {dataState.wind.speed}m/s {dataState.wind.deg}Degree</p>
            </Col>

            <div className="line"></div>

            <Col className="small-p justify-content-md-center">
              <div>
                <p className="no-bot-mar"><span className="info-type">
                    Sunrise: </span>{sunriseFormattedTime}</p>
                <p className="no-bot-mar"><span className="info-type">
                    Sunset: </span> {sunsetFormattedTime}</p>
                <p className="no-bot-mar"><span className="info-type">
                    ID: </span> {dataState.id}</p>

              </div>
            </Col>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default LargeCard;
