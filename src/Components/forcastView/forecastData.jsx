import moment from "moment";
import { windDirect } from "../../helpers/windDirection";
import { tempCelsius } from "../../helpers/tempCelsius";

export const getForecastData = (weather) => {
    const descr = weather[0]["description"];
    const icon = weather[0]["icon"];
    return { descr, icon };
};

export const getForecastParams = (forecastdata) => {
    const { timezone_offset, daily } = forecastdata;
    const {
        temp: { day, night },
        pressure,
        pop,
        wind_speed,
        wind_deg,
        dt,
    } = daily;

    const newPressure = Math.round(pressure / 1.333),
        dayTemp = tempCelsius(day),
        nightTemp = tempCelsius(night),
        newWindSpeed = Math.round(wind_speed),
        newPop = Math.round(pop * 100),
        newWindDirect = windDirect(wind_deg),
        forecastDay = moment
            .unix(dt)
            .utc()
            .add(timezone_offset, "seconds")
            .format("dddd DD MMMM");

    return {
        newPressure,
        dayTemp,
        nightTemp,
        newWindSpeed,
        newWindDirect,
        newPop,
        forecastDay,
    };
};
