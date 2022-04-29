import { useState, useEffect } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import moment from "moment";
import "moment/locale/ru";
import CurrentView from "../currentView/currentView";

import "./currentWeather.css";
import ForecastView from "../forcastView/forcastView";
import { useFetchWeather } from "./hooks";

const CurrentWeather = ({ cityId, flagId }) => {
  const [localTime, setLocalTime] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [lastupd, setLastupd] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  const { error, loaded, loading, getWeather } = useFetchWeather();

  useEffect(() => {
    if (cityId) {
      getWeather(cityId).then((weather) => {
        if (!weather) return;

        setWeatherData(weather.weatherData);
        console.log("pollutionData :>> ", weather.pollutionData);
      });
    }
    console.log("hooks version");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagId, cityId]);

  useEffect(() => {
    const timeOut = setInterval(() => updateTime(), 10000);
    return () => clearInterval(timeOut);
  });

  useEffect(() => {
    updateTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const updateTime = () => {
    if (loaded) {
      const {
        timezone_offset,
        current: { dt },
      } = weatherData;
      setLocalTime(moment.utc().add(timezone_offset, "seconds").format("LT"));
      setLocalData(
        moment.utc().add(timezone_offset, "seconds").format("dddd DD MMMM")
      );
      setLastupd(moment.unix(dt).startOf().fromNow());
    }
  };

  return (
    <div>
      {error ? <ErrorMessage /> : null}
      {loading ? <Spinner /> : null}
      {!(error || loading) && loaded ? (
        <CurrentView
          currentdata={[weatherData, lastupd, cityId, localData, localTime]}
        />
      ) : null}
      {!(error || loading) && loaded ? (
        <ForecastView forecastdata={weatherData} />
      ) : null}
    </div>
  );
};

export default CurrentWeather;
