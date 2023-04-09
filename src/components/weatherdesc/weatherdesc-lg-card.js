import React from 'react';
import Clouds from '../../assets/img/clouds.png';
import ClearSky from '../../assets/img/clear sky.png';
import LightRain from '../../assets/img/lightrain.png';
import BrokenClouds from '../../assets/img/broken-clouds.png';
import './weatherdesc.css';
import PropTypes from 'prop-types';

WeatherdescLgCard.propTypes = {
  desc: PropTypes.string.isRequired,
};

// eslint-disable-next-line require-jsdoc
function WeatherdescLgCard(props) {
  let ico;

  if (props.desc === 'few clouds') {
    ico = Clouds;
  } else if (props.desc === 'clear sky') {
    ico = ClearSky;
  } else if (props.desc === 'light rain') {
    ico = LightRain;
  } else {
    ico = BrokenClouds;
  }

  return (
    <div className="justify-content-md-center verti">
      <img className="des-ico2" src={ico}/>
      <p className="no-bot-mar">{props.desc}</p>
    </div>
  );
}

export default WeatherdescLgCard;
