import axios from "axios";

class GetData {       
    _appKey = '2e5e5a511f687e8d8ad9d60e5486dcc3';

    getCityCoordinates = async (city) => {
        const result = await axios.get(
            'https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: city,
                appid: this._appKey
            }
        });
        return this.transformCoords(result.data[0])
    }
    
    getWeather = async (latitude, lontitude) => {
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

    transformCoords = (coords) => {
        return {
            latitude: coords.lat,
            lontitude: coords.lon,
        }
    }  
}

export default GetData;