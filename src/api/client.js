import axios from 'axios';
import {API_URL} from '../consts';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

// gets the weather data
export const getWeatherData = async (ids) => {
  try {
    // making the request
    const response = await axios.get(API_URL, {
      params: {
        id: ids,
        units: 'metric',
        appid: API_KEY,
      },

    });
    // console.log(response.config);
    return response.data;
  } catch (error) {
    console.error(error);
    console.log(error.response);
  }
};
