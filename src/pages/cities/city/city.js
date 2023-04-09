import React, {useState, useEffect} from 'react';
import {Card, Col} from 'react-bootstrap';
import './city.css';
import {selectlocation} from '../../../redux/switcherSlice';
import {useDispatch} from 'react-redux';
import {getWeatherData} from '../../../api/client';
import Close from '../../../assets/img/close.png';
import WeatherdescSmCard from
  '../../../components/weatherdesc/weatherdesc-sm-card';
import Wind from '../../../assets/img/wind.png';
import PropTypes from 'prop-types';

City.propTypes = {
  id: PropTypes.string.isRequired,
};

/**
 * @param {props} props - All the required data from the dataset is taken
 * @return {JSX.Element} jsx content required for the footer.
 */
function City(props) {
  const dispatch = useDispatch();

  const [cityWeather, setCityWeather] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(null);

  const selectLoc = () =>{
    dispatch(selectlocation(props.id));
  };
  const nowtime = new Date().getTime();
  const localdt = JSON.parse(localStorage.getItem(props.id+'ds'));

  const [sunriseFormattedTime, setSunriseFormattedTime] = useState(null);
  const [sunsetFormattedTime, setSunsetFormattedTime] = useState(null);
  const [citydateFormattedTime, setCitydateFormattedTime] = useState(null);
  let randomColor = null;

  useEffect(() => {
    const localdttime = localStorage.getItem(props.id+'Time');
    // chckin data availability in local storage
    if ((nowtime-localdttime > (5*60*1000)) || localdt === null ) {
      // axios call
      getWeatherData(props.id)
          .then((data) =>{
            const t1 = new Date().getTime();
            localStorage.setItem(props.id+'ds', JSON.stringify(data));
            localStorage.setItem(props.id+'Time', t1);
            setCityWeather(JSON.parse(localStorage.getItem(props.id+'ds')));
            console.log(cityWeather);
          })
          .catch((error) => console.error(error));
    } else {
      // fetching data from the local storage
      setCityWeather(localdt);
    }
  }, [shouldFetch]);

  // checking time when the component is not refreshed.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCityWeather(null);
      setShouldFetch(true);
    }, 5 * 60 * 1000); // check every 5 mins

    return () => {
      clearInterval(intervalId);
    };
  }, [cityWeather]);

  useEffect(() => {
    if (cityWeather !== null) {
      console.log(cityWeather);
      let sunrise = cityWeather.sys.sunrise;
      let sunset = cityWeather.sys.sunset;
      let citydate = cityWeather.dt;

      // sunrise
      // multiply by 1000 to convert to milliseconds
      sunrise = new Date(sunrise * 1000);
      const sunrisehours = sunrise.getHours();
      const sunriseminutes = sunrise.getMinutes();
      const sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
      setSunriseFormattedTime(`${(sunrisehours % 12).toLocaleString('en-US',
          {minimumIntegerDigits: 2, useGrouping: false}) || 12}:
          ${sunriseminutes < 10 ? '0' : ''}${sunriseminutes}${sunriseampm}`);

      // sunset
      // multiply by 1000 to convert to milliseconds
      sunset = new Date(sunset * 1000);
      const sunsethours = sunset.getHours();
      const sunsetminutes = sunset.getMinutes();
      const sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
      setSunsetFormattedTime(`${(sunsethours % 12).toLocaleString('en-US',
          {minimumIntegerDigits: 2, useGrouping: false}) || 12}:
          ${sunsetminutes < 10 ? '0' : ''}${sunsetminutes}${sunsetampm}`);

      // citydate
      // multiply by 1000 to convert to milliseconds
      citydate = new Date(citydate * 1000);
      const citydatehours = citydate.getHours();
      const citydateminutes = citydate.getMinutes();

      const month = citydate.toLocaleString('default', {month: 'short'});
      const day = citydate.getDate();
      const citydateampm = citydatehours >= 12 ? 'pm' : 'am';
      setCitydateFormattedTime(`${citydatehours % 12 || 12}:${citydateminutes <
      10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `);
    }
  }), [cityWeather];

  // random dark color generator
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  randomColor = {backgroundColor: `${color}`};

  return (

    <Col onClick={selectLoc}>
      <Card className="city-card">
        {cityWeather !== null ? (

        <div>
          <div className="card-top" style={randomColor}>
            <div className="close-bar">
              <div className="close">
                <img src={Close} alt={'close button'}/>
              </div>
            </div>
            <div className="card-top-marg  d-flex">
              <Col xs={6} sm={6} md={6} lg={7} className="town">
                {/* eslint-disable-next-line react/prop-types */}
                <h4 className="txt-location">{cityWeather.name}
                  , {cityWeather.sys.country}</h4>
                <p>{citydateFormattedTime}</p>

                <div className="justify-content-center">
                  <WeatherdescSmCard desc={cityWeather.weather[0].description}/>
                </div>
              </Col>

              <Col xs={6} sm={6} md={6} lg={5}>
                <h3 className="txt-temp">
                  {/* eslint-disable-next-line react/prop-types,max-len */}
                  {Math.round(cityWeather.main.temp)}°<span className="txt-celc">C</span></h3>
                <p className="no-bot-mar small-p">
                  {/* eslint-disable-next-line react/prop-types */}
                  Temp Min: {Math.round(cityWeather.main.temp_min)}°c</p>
                <p className="no-bot-mar small-p">
                  {/* eslint-disable-next-line react/prop-types */}
                  Temp Max: {Math.round(cityWeather.main.temp_max)}°0c</p>
              </Col>
            </div>
          </div>

          <div className="card-bot d-flex">

            <Col className="small-p left-align adv-data">

              <p className="no-bot-mar">
                <span className="info-type">
                  {/* eslint-disable-next-line react/prop-types */}
                  Pressure: </span>{cityWeather.main.pressure}hPa</p>
              <p className="no-bot-mar">
                <span className="info-type">
                  {/* eslint-disable-next-line react/prop-types */}
                  Humidity: </span>{cityWeather.main.humidity}%</p>
              <p className="no-bot-mar">
                <span className="info-type">
                  {/* eslint-disable-next-line react/prop-types */}
                  Visibility: </span>{cityWeather.visibility/1000}km</p>
            </Col>

            <div className="line"/>

            <Col className="small-p wind-info">
              <div>
                <img src={Wind}
                  className="wind-ico" alt={'wind direction'}/>
              </div>
              {/* eslint-disable-next-line react/prop-types */}
              <p className="no-bot-mar">{Math.round(cityWeather.wind.speed)}
                m/s {cityWeather.wind.deg} Degree</p>
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
        </div>
          ):(
              <p style={{color: 'black'}}>Loading</p>
          )}
      </Card>
    </Col>
  );
}

export default City;
