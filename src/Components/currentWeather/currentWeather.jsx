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

    const { process, getWeather } = useFetchWeather();

    useEffect(() => {
        if (cityId) {
            getWeather(cityId).then((weather) => {
                if (!weather) return;

                setWeatherData(weather.weatherData);
                console.log("pollutionData :>> ", weather.pollutionData);
                console.log("weatherData :>> ", weather.weatherData);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagId, cityId]);

    useEffect(() => {
        const timeOut = setInterval(() => updateTime(), 10000);
        return () => clearInterval(timeOut);
    });

    useEffect(() => {
        updateTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process === "loaded"]);

    const updateTime = () => {
        if (process === "loaded") {
            const {
                timezone_offset,
                current: { dt },
            } = weatherData;
            setLocalTime(
                moment.utc().add(timezone_offset, "seconds").format("LT")
            );
            setLocalData(
                moment
                    .utc()
                    .add(timezone_offset, "seconds")
                    .format("dddd DD MMMM")
            );
            setLastupd(moment.unix(dt).startOf().fromNow());
        }
    };

    const setContent = (process) => {
        switch (process) {
            case "waiting":
                return null;
            case "loading":
                return <Spinner />;
            case "loaded":
                return (
                    <>
                        <CurrentView
                            currentdata={[
                                weatherData,
                                lastupd,
                                cityId,
                                localData,
                                localTime,
                            ]}
                        />
                        <ForecastView forecastdata={weatherData} />
                    </>
                );
            case "error":
                return <ErrorMessage />;
            default:
                throw new Error("Unexpected process state");
        }
    };

    return <div>{setContent(process)}</div>;
};

export default CurrentWeather;
