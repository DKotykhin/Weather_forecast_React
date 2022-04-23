import axios from "axios";

class WeatherService { 
    _appBase = 'https://api.openweathermap.org/';   
    _appKey = '2e5e5a511f687e8d8ad9d60e5486dcc3';

    getResource = (url) => {
        let response = axios.get(url)            
        return response;
    }

    getCityCoordinates = async (city) => {
        const res = await this.getResource(`${this._appBase}geo/1.0/direct?q=${city}&appid=${this._appKey}`);
        return this.getCoords(res.data[0])
    }
    
    currentWeather = async (latitude, lontitude) => {
        const res = await this.getResource(`${this._appBase}data/2.5/onecall?lat=${latitude}&lon=${lontitude}&lang=ru&appid=${this._appKey}`);       
        return res.data
    }

    getCoords = (coords) => {
        return {
            latitude: coords.lat,
            lontitude: coords.lon,
        }
    }  
}

export default WeatherService;