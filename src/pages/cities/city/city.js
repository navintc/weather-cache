import React, {useState, useEffect} from 'react';
import {Card, Col} from 'react-bootstrap';
import './city.css';
// import Wind from '../../../assets/img/wind.png';
// import Close from '../../../assets/img/close.png';
// import WeatherdescSmCard from
//   '../../../components/weatherdesc/weatherdesc-sm-card';
import {selectlocation} from '../../../redux/switcherSlice';
import {useDispatch} from 'react-redux';
import {getWeatherData} from '../../../api/client';
import {updateDataPack} from '../../../redux/dataSlice';

/**
 * @param {props} props - All the required data from the dataset is taken
 * @return {JSX.Element} jsx content required for the footer.
 */
function City(props) {
  const dispatch = useDispatch();


  // eslint-disable-next-line no-unused-vars
  const [cityWeather, setCityWeather] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [shouldFetch, setShouldFetch] = useState(null);

  const selectLoc = () =>{
    // eslint-disable-next-line react/prop-types
    dispatch(selectlocation(props.id));
  };
  const nowtime = new Date().getTime();
  // eslint-disable-next-line react/prop-types
  const localdt = JSON.parse(localStorage.getItem(props.id+'ds'));


  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const localdttime = localStorage.getItem(props.id+'Time');
    // chckin data availability in local storage
    if ((nowtime-localdttime > (5*60*1000)) || localdt === null ) {
      // axios call\
      // eslint-disable-next-line react/prop-types
      getWeatherData(props.id)
          .then((data) =>{
            const t1 = new Date().getTime();
            // eslint-disable-next-line react/prop-types
            localStorage.setItem(props.id+'ds', JSON.stringify(data));
            // eslint-disable-next-line react/prop-types
            localStorage.setItem(props.id+'Time', t1);
            // eslint-disable-next-line react/prop-types
            setCityWeather(JSON.parse(localStorage.getItem(props.id+'ds')));
          })
          .catch((error) => console.error(error));
    } else {
      // fetching data from the local storage
      setCityWeather(localdt);
      dispatch(updateDataPack(localdt));
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

  // let sunrise = props.sunrise;
  // let sunset = props.sunset;
  // let citydate = props.date;


  // sunrise
  // multiply by 1000 to convert to milliseconds
  // sunrise = new Date(sunrise * 1000);
  // const sunrisehours = sunrise.getHours();
  // const sunriseminutes = sunrise.getMinutes();
  // const sunriseampm = sunrisehours >= 12 ? 'pm' : 'am';
  // const sunriseFormattedTime = `${(sunrisehours % 12).toLocaleString('en-US',
  // eslint-disable-next-line max-len
  //     {minimumIntegerDigits: 2, useGrouping: false}) || 12}:${sunriseminutes <
  //   10 ? '0' : ''}${sunriseminutes}${sunriseampm}`;


  // sunset
  // multiply by 1000 to convert to milliseconds
  // sunset = new Date(sunset * 1000);
  // const sunsethours = sunset.getHours();
  // const sunsetminutes = sunset.getMinutes();
  // const sunsetampm = sunsethours >= 12 ? 'pm' : 'am';
  // const sunsetFormattedTime = `${(sunsethours % 12).toLocaleString('en-US',
  //     {minimumIntegerDigits: 2, useGrouping: false}) || 12}:${sunsetminutes <
  //   10 ? '0' : ''}${sunsetminutes}${sunsetampm}`;


  // citydate
  // multiply by 1000 to convert to milliseconds
  // citydate = new Date(citydate * 1000);
  // const citydatehours = citydate.getHours();
  // const citydateminutes = citydate.getMinutes();
  //
  // const month = citydate.toLocaleString('default', {month: 'short'});
  // const day = citydate.getDate();
  // const citydateampm = citydatehours >= 12 ? 'pm' : 'am';
  // eslint-disable-next-line max-len
  // const citydateFormattedTime = `${citydatehours % 12 || 12}:${citydateminutes <
  //   10 ? '0' : ''}${citydateminutes}${citydateampm} , ${month} ${day} `;


  // wind degree
  // const winddegree = {transform: `rotate(${props.speeddeg - 45}deg)`};

  // random dark color generator
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  // eslint-disable-next-line no-unused-vars
  const randomColor = {backgroundColor: `${color}`};

  return (

    <Col onClick={selectLoc}>
      <Card className="city-card">
        {cityWeather !== null ?
        <p style={{color: 'Black'}}>{cityWeather.name}</p> :
            <p style={{color: 'Black'}}>Loading</p>}
      </Card>
    </Col>
  );
}

export default City;
