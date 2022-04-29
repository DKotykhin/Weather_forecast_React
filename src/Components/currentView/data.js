import moment from "moment";
import { windDirect } from "../../helpers/windDirection";

const formatTime = (offset, time) => {
  return moment.unix(time).utc().add(offset, "seconds").format("LT");
};

export const getWeatherData = (weather) => {
  const descr = weather[0]["description"];
  const icon = weather[0]["icon"];

  return { descr, icon };
};

export const getWeatherParams = (weather) => {
  const {
    pressure,
    temp,
    feels_like,
    dew_point,
    wind_speed,
    wind_deg,
    timezone_offset,
    visibility,
    sunrise,
    sunset,
  } = weather;

  const newPressure = Math.round(pressure / 1.333);
  const newTemp = Math.round(temp - 273);
  const newFeels = Math.round(feels_like - 273);
  const newDewPoint = Math.round(dew_point - 273);
  const newWindSpeed = Math.round(wind_speed);
  const newWindDirect = windDirect(wind_deg);
  const newVis = visibility / 1000;

  const newSunrise = formatTime(timezone_offset, sunrise);
  const newSunset = formatTime(timezone_offset, sunset);
  const dayDuration = formatTime(timezone_offset, sunset - sunrise);

  return {
    newPressure,
    newTemp,
    newFeels,
    newDewPoint,
    newWindSpeed,
    newWindDirect,
    newVis,
    newSunrise,
    newSunset,
    dayDuration,
  };
};
