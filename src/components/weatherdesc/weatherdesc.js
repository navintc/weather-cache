import React from 'react';
import Clouds from '../../assets/img/clouds.png';
import ClearSky from '../../assets/img/clear sky.png';
import LightRain from '../../assets/img/lightrain.png';
import BrokenClouds from '../../assets/img/broken-clouds.png';
import './weatherdesc.css';
import PropTypes from 'prop-types';

Weatherdesc.propTypes = {
  desc: PropTypes.string.isRequired,
};

let ico;
// eslint-disable-next-line require-jsdoc
function Weatherdesc(props) {
  if (props.desc === 'few clouds') {
    // eslint-disable-next-line no-unused-vars
    ico = Clouds;
  } else if (props.desc === 'clear sky') {
    // eslint-disable-next-line no-unused-vars
    ico = ClearSky;
  } else if (props.desc === 'light rain') {
    // eslint-disable-next-line no-unused-vars
    ico = LightRain;
  } else {
    // eslint-disable-next-line no-unused-vars
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

export default Weatherdesc;
