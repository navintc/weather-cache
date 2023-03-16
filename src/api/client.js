import axios from 'axios';
import {OPENWEATHER_API_KEY as API_KEY, API_URL} from '../consts';

//gets the weather data 
export const getWeatherData = async (ids) => {

  try {
    //making the request
    const response = await axios.get(API_URL, {
      params: {
        id: ids,
        units: "metric",
        appid: API_KEY
      }
      
    });
    // console.log(response.config);
    return response.data;

  } catch (error) {
    console.error(error);
    console.log(error.response);
  }
};

