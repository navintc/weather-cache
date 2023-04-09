import React from 'react';
import Clouds from '../../assets/img/clouds.png';
import ClearSky from '../../assets/img/clear sky.png';
import LightRain from '../../assets/img/lightrain.png';
import BrokenClouds from '../../assets/img/broken-clouds.png';
import './weatherdesc.css';
import PropTypes from 'prop-types';

WeatherdescSmCard.propTypes = {
  desc: PropTypes.string.isRequired,
};

let ico;
// eslint-disable-next-line require-jsdoc
function WeatherdescSmCard(props) {
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
    <div className="d-flex justify-content-center">
      <img className="des-ico" src={ico} alt={'day-icon'}/>
      {props.desc.length < 16 ? (
          <p className="no-bot-mar">{props.desc}</p>
      ) : (
          <div className={'marquee'}>
            <p className="no-bot-mar">{props.desc}</p>
          </div>
      )}

    </div>
  );
}

export default WeatherdescSmCard;
