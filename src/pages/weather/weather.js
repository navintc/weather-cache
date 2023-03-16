import React, {useState, useEffect} from 'react';
import LogoWeather from './components/logoWeather/logoWeather';
import './weather.css';
import { getWeatherData } from '../../api/client';
import cityData from "../../json/cities.json";
import { updateDataPack } from '../../redux/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cities from './components/cities/cities';


function Weather(){
    const [cityWeather, setCityWeather] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(null);
    
    const dispatch = useDispatch()

    //must find a way to check on this time state (suggestion: useState but it cant be used)
    var timeState = useSelector((state) => state.dataPack.time);
    var dataState = useSelector((state) => state.dataPack.dataSet);
    

    useEffect(() => {
        let obj = [];
        let nowtime = new Date().getTime();

        //axios call
        if ((nowtime-timeState == (5*60)) || dataState == null ){
            for (var i = 0; i < cityData.List.length; i++){
                getWeatherData(cityData.List[i].CityCode)
                .then(data =>{
                    obj.push(data);
                    if (obj.length === cityData.List.length) { // check if all data has been fetched
                        setCityWeather(obj);
                        dispatch(updateDataPack(obj));
                    }
                })
                .catch(error => console.error(error));
            }
        }


    },[shouldFetch]);


    //checking time when the component is not refreshed.
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCityWeather(null);   
            setShouldFetch(true);
          }, 5 * 60 * 1000); // check every 5 mins
           
          return () => {
            clearInterval(intervalId);
          };
      }, [cityWeather]);

    return(
        <div className='weather'>
            <div className='logo-bar'>
                <LogoWeather/>
                <Cities/>              
            </div>
            

        </div>

    );

}
export default Weather;