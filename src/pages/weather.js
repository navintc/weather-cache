import React, {useState, useEffect} from 'react';
import LogoWeather from './logoWeather/logoWeather';
import './weather.css';
import {getWeatherData} from '../api/client';
import cityData from '../json/cities.json';
import {updateDataPack} from '../redux/dataSlice';
import {useSelector, useDispatch} from 'react-redux';
import Cities from './cities/cities';
import Footerw from '../components/footer/footer';
import LargeCard from './largeCard/largeCard';

// eslint-disable-next-line require-jsdoc
function Weather() {
  const [cityWeather, setCityWeather] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(null);


  const dispatch = useDispatch();

  // eslint-disable-next-line max-len
  // must find a way to check on this time state (suggestion: useState but it can't be used)
  const timeState = useSelector((state) => state.dataPack.time);
  const dataState = useSelector((state) => state.dataPack.dataSet);
  const selectedLocation = useSelector((state) =>
    state.selectorPack.selectedLocation);

  useEffect(() => {
    const obj = [];
    const nowtime = new Date().getTime();
    const localdt = JSON.parse(localStorage.getItem('weatherDataSet'));
    const localdttime = localStorage.getItem('weatherTime');

    // checkin data availability in local storage
    if ((nowtime-localdttime > (5*60*1000)) || localdt === null ) {
      // axios call
      if ((nowtime-timeState > (5*60*1000)) || dataState === null ) {
        // iterating through the cities in the json
        for (let i = 0; i < cityData.List.length; i++) {
          getWeatherData(cityData.List[i].CityCode)
              .then((data) =>{
                obj.push(data);

                // check if all data has been fetched and saving them to
                // local storage and redux
                if (obj.length === cityData.List.length) {
                  setCityWeather(obj);
                  dispatch(updateDataPack(obj));
                  const t1 = new Date().getTime();
                  localStorage.setItem('weatherDataSet', JSON.stringify(obj));
                  localStorage.setItem('weatherTime', t1);
                }
              })
              .catch((error) => console.error(error));
        }
      }
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

  return (
    <div className='weather'>
      <div className='logo-bar'>
        <LogoWeather/>
        {selectedLocation === undefined || selectedLocation === null ? (
                    <Cities/>
                ):(
                     <LargeCard location={selectedLocation}/>
                )}

        <Footerw/>
      </div>
    </div>
  );
}
export default Weather;
