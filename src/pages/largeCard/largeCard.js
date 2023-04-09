import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {selectlocation} from '../../redux/switcherSlice';
import Back from '../../assets/img/back.png';
import Wind from '../../assets/img/wind.png';
import './largeCard.css';
import WeatherdescLgCard from
  '../../components/weatherdesc/weatherdesc-lg-card';
import PropTypes from 'prop-types';

LargeCard.propTypes = {
  location: PropTypes.string.isRequired,
};

// eslint-disable-next-line require-jsdoc
function LargeCard(props) {
  const dispatch = useDispatch();
  let citydateFormattedTime = 0;
  let sunsetFormattedTime = 0;
  let sunriseFormattedTime = 0;

  const backBtn = () =>{
    dispatch(selectlocation(null));
  };

  const id = props.location;
  let dataState = JSON.parse(localStorage.getItem(id+'ds'));

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
    sunrise = new Date(sunrise * 1000);
    const sunrisehours = sunrise.getHours();
    const sunriseminutes = sunrise.getMinutes();
    const sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
    sunriseFormattedTime = `${sunrisehours % 12 || 12}:${sunriseminutes <
      10 ? '0' : ''}${sunriseminutes}${sunriseampm}`;

    // sunset
    sunset = new Date(sunset * 1000);
    const sunsethours = sunset.getHours();
    const sunsetminutes = sunset.getMinutes();
    const sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
    sunsetFormattedTime = `${sunsethours % 12 || 12}:${sunsetminutes <
      10 ? '0' : ''}${sunsetminutes}${sunsetampm}`;

    // citydate
    citydate = new Date(citydate * 1000);
    const citydatehours = citydate.getHours();
    const citydateminutes = citydate.getMinutes();
    const month = citydate.toLocaleString('default', {month: 'short'});
    const day = citydate.getDate();
    const citydateampm = citydatehours >= 12 ? 'pm' : 'am';
    citydateFormattedTime = `${citydatehours % 12 || 12}:${citydateminutes <
      10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `;
  }

  // random dark color generator
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }

  const randomColor = {backgroundColor: `${color}`};

  return (
    <Row className="justify-content-md-center upper-root">
      <Col xs={11} md={6} className="justify-content-md-center mx-auto">
        <Card className="city-card">
          <div className="large-card-top" style={randomColor}>
            <div className="close-bar">
              <div className="back" onClick={backBtn}>
                <img src={Back} alt={'Back Button'}/>
              </div>
            </div>

            <div className="card-root2">
              <h4 className="txt-location">{dataState?.name ??
                  'Unknown location'}, {dataState.country}</h4>
              <p>{citydateFormattedTime}</p>
            </div>
            <Row className="justify-content-md-center">
              <div className="snap-data-box col-sm-12 col-md-8 d-flex">
                <Col xs={6} className="town">
                  <div>
                    <WeatherdescLgCard
                      desc={dataState.weather[0].description}/>
                  </div>
                </Col>
                <div className="line2"/>
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

            <div className="line"/>

            <Col className="small-p ">
              <div>
                <img src={Wind}
                  className="wind-ico" alt={'wind direction'}/>
              </div>
              <p className="no-bot-mar">
                {dataState.wind.speed}m/s {dataState.wind.deg}Degree</p>
            </Col>

            <div className="line"/>

            <Col className="small-p justify-content-md-center suntime-block">
              <div className={'suntimes'}>
                <p className="no-bot-mar"><span className="info-type">
                    Sunrise: </span>{sunriseFormattedTime}</p>
                <p className="no-bot-mar"><span className="info-type">
                    Sunset: </span> {sunsetFormattedTime}</p>
              </div>
            </Col>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default LargeCard;
