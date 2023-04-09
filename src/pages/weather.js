import React from 'react';
import LogoWeather from './logoWeather/logoWeather';
import './weather.css';
import {useSelector} from 'react-redux';
import Cities from './cities/cities';
import Footerw from '../components/footer/footer';
import LargeCard from './largeCard/largeCard';

// eslint-disable-next-line require-jsdoc
function Weather() {
  const selectedLocation = useSelector((state) =>
    state.selectorPack.selectedLocation);

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
