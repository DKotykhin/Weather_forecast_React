import { windDirect } from "../../helpers/windDirection";
import { tempCelsius } from "../../helpers/tempCelsius";
import { formatTime } from "../../helpers/formatTime";

export const getWeatherData = (weather) => {
    const descr = weather[0]["description"];
    const icon = weather[0]["icon"];
    return { descr, icon };
};

export const getWeatherParams = (weather) => {
    const { timezone_offset, current } = weather;
    const {
        pressure,
        temp,
        feels_like,
        dew_point,
        wind_speed,
        wind_deg,
        visibility,
        sunrise,
        sunset,
    } = current;

    const newPressure = Math.round(pressure / 1.333);
    const newTemp = tempCelsius(temp);
    const newFeels = tempCelsius(feels_like);
    const newDewPoint = tempCelsius(dew_point);
    const newWindSpeed = Math.round(wind_speed);
    const newWindDirect = windDirect(wind_deg);
    const newVisibility = visibility / 1000;

    const newSunrise = formatTime(timezone_offset, sunrise);
    const newSunset = formatTime(timezone_offset, sunset);
    const dayDuration = formatTime(0, sunset - sunrise);

    return {
        newPressure,
        newTemp,
        newFeels,
        newDewPoint,
        newWindSpeed,
        newWindDirect,
        newVisibility,
        newSunrise,
        newSunset,
        dayDuration,
    };
};