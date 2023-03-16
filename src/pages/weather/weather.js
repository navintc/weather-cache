import React, {useState, useEffect} from 'react';
import LogoWeather from './components/logoWeather/logoWeather';
import './weather.css';
import { getWeatherData } from '../../api/client';
import cityData from "../../json/cities.json";
import { updateDataPack } from '../../redux/dataSlice';
import { useSelector, useDispatch } from 'react-redux'


function Weather(){
    const [cityWeather, setCityWeather] = useState(null);
    const [cityIDs, setCityIDs] = useState(null);
    
    const dispatch = useDispatch()

    useEffect(() => {
        let obj = [];
        for (var i = 0; i < cityData.List.length; i++){
            getWeatherData(cityData.List[i].CityCode)
            .then(data =>{
                console.log(data);
                obj.push(data);
                if (obj.length === cityData.List.length) { // check if all data has been fetched
                    setCityWeather(obj);
                    dispatch(updateDataPack(obj));
                }
            })
            .catch(error => console.error(error));
        }

    },[]);

    return(
        <div className='weather'>
            <div className='logo-bar'>
                <LogoWeather/>
                
            </div>
            

        </div>

    );

}
export default Weather;