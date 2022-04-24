import axios from "axios";

class WeatherService {       
    _appKey = '2e5e5a511f687e8d8ad9d60e5486dcc3';

    getCityCoordinates = async (city) => {
        const result = await axios.get(
            'https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: city,
                appid: this._appKey
            }
        });
        return this.getCoords(result.data[0])
    }
    
    currentWeather = async (latitude, lontitude) => {
        const result = await axios.get(
            'https://api.openweathermap.org/data/2.5/onecall?&lang=ru&}', {
            params: {
              lat: latitude,
              lon: lontitude,
              appid: this._appKey   
            }
        });       
        return result.data
    }

    getCoords = (coords) => {
        return {
            latitude: coords.lat,
            lontitude: coords.lon,
        }
    }  
}

export default WeatherService