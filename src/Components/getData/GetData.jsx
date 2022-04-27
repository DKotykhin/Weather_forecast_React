import axios from "axios";

const GetData = () => {       
    const _appKey = '2e5e5a511f687e8d8ad9d60e5486dcc3';

    const getCityCoordinates = async (city) => {        
        const result = await axios.get(
            'https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: city,
                appid: _appKey
            }
        });
        return result.data[0]             
    }
    
    const getCityWeather = async (latitude, lontitude) => {        
        const result = await axios.get(
            'https://api.openweathermap.org/data/2.5/onecall?&lang=ru&}', {
            params: {
                lat: latitude,
                lon: lontitude,
                appid: _appKey   
            }
        });       
        return result.data               
    }
   
    return { getCityCoordinates, getCityWeather }  
}

export default GetData;