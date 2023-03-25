import React from 'react';
import {Card, Col} from 'react-bootstrap';
import './city.css';
import Wind from '../../../../../assets/img/wind.png';
import Close from '../../../../../assets/img/close.png';
import Weatherdesc from '../../../../../components/weatherdesc/weatherdesc';
import {selectlocation} from '../../../../../redux/switcherSlice';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

City.propTypes = {
  sunrise: PropTypes.instanceOf(Date).isRequired,
  sunset: PropTypes.instanceOf(Date).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  speeddeg: PropTypes.number.isRequired,
  weather: PropTypes.array.isRequired,
};

/**
 * @param {props} props - All the required data from the dataset is taken
 * @return {JSX.Element} jsx content required for the footer.
 */
function City(props) {
  const dispatch = useDispatch();

  const selectLoc = () =>{
    // eslint-disable-next-line react/prop-types
    dispatch(selectlocation(props.name));
  };


  let sunrise = props.sunrise;
  let sunset = props.sunset;
  let citydate = props.date;


  // sunrise
  // multiply by 1000 to convert to milliseconds
  sunrise = new Date(sunrise * 1000);
  const sunrisehours = sunrise.getHours();
  const sunriseminutes = sunrise.getMinutes();
  const sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
  const sunriseFormattedTime = `${(sunrisehours % 12).toLocaleString('en-US',
      {minimumIntegerDigits: 2, useGrouping: false}) || 12}:${sunriseminutes <
    10 ? '0' : ''}${sunriseminutes}${sunriseampm}`;


  // sunset
  // multiply by 1000 to convert to milliseconds
  sunset = new Date(sunset * 1000);
  const sunsethours = sunset.getHours();
  const sunsetminutes = sunset.getMinutes();
  const sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
  const sunsetFormattedTime = `${(sunsethours % 12).toLocaleString('en-US',
      {minimumIntegerDigits: 2, useGrouping: false}) || 12}:${sunsetminutes <
    10 ? '0' : ''}${sunsetminutes}${sunsetampm}`;


  // citydate
  // multiply by 1000 to convert to milliseconds
  citydate = new Date(citydate * 1000);
  const citydatehours = citydate.getHours();
  const citydateminutes = citydate.getMinutes();

  const month = citydate.toLocaleString('default', {month: 'short'});
  const day = citydate.getDate();
  const citydateampm = citydatehours >= 12 ? 'pm' : 'am';
  const citydateFormattedTime = `${citydatehours % 12 || 12}:${citydateminutes <
    10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `;


  // wind degree
  const winddegree = {transform: `rotate(${props.speeddeg - 45}deg)`};

  // random dark color generator
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  const randomColor = {backgroundColor: `${color}`};

  return (

    <Col xs={12} sm={12} md={12} lg={6} onClick={selectLoc}>
      <Card className="city-card">
        <div className="card-top" style={randomColor}>
          <div className="close-bar">
            <div className="close">
              <img src={Close} alt={'close button'}/>
            </div>
          </div>
          <div className="card-top-marg  d-flex">
            <Col xs={6} sm={6} md={6} lg={7} className="town">
              {/* eslint-disable-next-line react/prop-types */}
              <h4 className="txt-location">{props.name}, {props.country}</h4>
              <p>{citydateFormattedTime}</p>

              <div className="justify-content-center">
                <Weatherdesc desc={props.weather[0].description}/>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={5}>
              <h3 className="txt-temp">
                {/* eslint-disable-next-line react/prop-types,max-len */}
                {Math.round(props.temp)}°<span className="txt-celc">C</span></h3>
              <p className="no-bot-mar small-p">
                {/* eslint-disable-next-line react/prop-types */}
                  Temp Min: {Math.round(props.mintemp)}°c</p>
              <p className="no-bot-mar small-p">
                {/* eslint-disable-next-line react/prop-types */}
                  Temp Max: {Math.round(props.maxtemp)}°0c</p>
            </Col>
          </div>
        </div>

        <div className="card-bot d-flex">

          <Col className="small-p left-align adv-data">

            <p className="no-bot-mar">
              <span className="info-type">
                {/* eslint-disable-next-line react/prop-types */}
                    Pressure: </span>{props.pressure}hPa</p>
            <p className="no-bot-mar">
              <span className="info-type">
                {/* eslint-disable-next-line react/prop-types */}
                    Humidity: </span>{props.humidity}%</p>
            <p className="no-bot-mar">
              <span className="info-type">
                {/* eslint-disable-next-line react/prop-types */}
                    Visibility: </span>{props.visibility/1000}km</p>
          </Col>

          <div className="line"/>

          <Col className="small-p wind-info">
            <div>
              <img src={Wind} style={winddegree}
                className="wind-ico" alt={'wind direction'}/>
            </div>
            {/* eslint-disable-next-line react/prop-types */}
            <p className="no-bot-mar">{Math.round(props.wind)}
              m/s {props.speeddeg}Degree</p>
          </Col>

          <div className="line"/>

          <Col className="small-p justify-content-md-center">
            <div className={'suntimes'}>
              <p className="no-bot-mar">
                <span className="info-type">
                      Sunrise: </span>{sunriseFormattedTime}</p>
              <p className="no-bot-mar">
                <span className="info-type">
                      Sunset: </span>{sunsetFormattedTime}</p>
              <p className="no-bot-mar">
                <span className="info-type">
                  {/* eslint-disable-next-line react/prop-types */}
                      ID: </span> {props.id}</p>
            </div>
          </Col>
        </div>
      </Card>
    </Col>
  );
}

export default City;
