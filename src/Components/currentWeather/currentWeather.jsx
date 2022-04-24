import { useState, useEffect } from "react";
import WeatherService from "../getData/GetData";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import moment from "moment";
import "moment/locale/ru";
import { Grid } from "@mui/material";

import "./CurrentWeather.css";

const CurrentWeather = (props) => {
    const [loading, setLoading] = useState(false),
        [loaded, setLoaded] = useState(false),
        [error, setError] = useState(false),
        [flag, setFlag] = useState(true),
        [cityName, setCityName] = useState(null),
        [localTime, setLocalTime] = useState(null),
        [localData, setLocalData] = useState(null),
        [lastupd, setLastupd] = useState(null),
        [weatherData, setWeatherData] = useState({});

    const weatherService = new WeatherService();

    useEffect(() => {
        getCity();
        //console.log('useEffect')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cityId, flag]);

    useEffect(() => {
        const timeOut = setInterval(() => updateTime(), 10000);
        return () => clearInterval(timeOut);
    });

    const updateTime = () => {
        if (loaded) {
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

    const getCity = () => {
        const { cityId, flagId } = props;
        if (cityId) {
            setLoading(true);
            setCityName(cityId);
            setFlag(flagId);
            getCoordinates();
        }
    };

    const getCoordinates = () => {
        if (cityName) {
            weatherService
                .getCityCoordinates(cityName)
                .then((coords) => getWeather(coords))
                .catch(onError);
        }
    };

    const getWeather = (coords) => {
        weatherService
            .currentWeather(coords.latitude, coords.lontitude)
            .then((weatherData) => {
                //console.log(weatherData);
                setLoading(false);
                setLoaded(true);
                //setError(false);
                setWeatherData(weatherData);
                console.log(weatherData);
            })
            .catch(onError);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
        console.log("error");
    };

    return (
        <div>
            {error ? <ErrorMessage /> : null}
            {loading ? <Spinner /> : null}
            {!(error || loading) && loaded ? (
                <View
                    view={[
                        weatherData,
                        lastupd,
                        cityName,
                        localData,
                        localTime,
                    ]}
                />
            ) : null}
            {!(error || loading) && loaded ? (
                <Forecast forecast={weatherData} />
            ) : null}
        </div>
    );
};

const View = ({ view }) => {
    const [
        { timezone_offset, current },
        lastupd,
        cityName,
        localData,
        localTime,
    ] = view;
    const {
        temp,
        feels_like,
        humidity,
        pressure,
        clouds,
        dew_point,
        visibility,
        uvi,
        wind_speed,
        wind_deg,
        sunrise,
        sunset,
        weather,
    } = current;

    const newPressure = Math.round(pressure / 1.333),
        newTemp = Math.round(temp - 273),
        newFeels = Math.round(feels_like - 273),
        newDewPoint = Math.round(dew_point - 273),
        newWindSpeed = Math.round(wind_speed),
        newWindDirect = WindDirect(wind_deg),
        newVis = visibility / 1000,
        newSunrise = moment
            .unix(sunrise)
            .utc()
            .add(timezone_offset, "seconds")
            .format("LT"),
        newSunset = moment
            .unix(sunset)
            .utc()
            .add(timezone_offset, "seconds")
            .format("LT"),
        dayDuration = moment
            .unix(sunset - sunrise)
            .utc()
            .add(timezone_offset, "seconds")
            .format("LT"),
        descr = weather[0]["description"],
        icon = weather[0]["icon"];

    return (
        <>
            <p className="lastupd">Последнее обновление: {lastupd}</p>
            <Grid container>
                <Grid item xs={12} md={6} xl={3}>
                    <div className="image">
                        <h2>{cityName}</h2>
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={icon}
                        />
                        <h2>{descr}</h2>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <table className="table">
                        <tr>
                            {/* <td>Сегодня: </td> */}
                            <td colspan="2" style={{ textAlign: "center" }}>
                                {localData}
                            </td>
                        </tr>
                        <tr>
                            <td>Местное время: </td>
                            <td>{localTime}</td>
                        </tr>
                        <tr>
                            <td>Рассвет: </td>
                            <td>{newSunrise}</td>
                        </tr>
                        <tr>
                            <td>Закат: </td>
                            <td>{newSunset}</td>
                        </tr>
                        <tr>
                            <td>Длительность дня: </td>
                            <td>{dayDuration}</td>
                        </tr>
                    </table>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <table className="table">
                        <tr>
                            <td>Температура: </td>
                            <td>{newTemp} °С</td>
                        </tr>
                        <tr>
                            <td>Чувствуется как: </td>
                            <td>{newFeels} °С</td>
                        </tr>
                        <tr>
                            <td>Влажность: </td>
                            <td>{humidity} %</td>
                        </tr>
                        <tr>
                            <td>Давление: </td>
                            <td>{newPressure} мм рт ст</td>
                        </tr>
                        <tr>
                            <td>Точка росы: </td>
                            <td>{newDewPoint} °С</td>
                        </tr>
                    </table>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <table className="table">
                        <tr>
                            <td>Скорость ветра: </td>
                            <td>{newWindSpeed} м/с</td>
                        </tr>
                        <tr>
                            <td>Ветер: </td>
                            <td>{newWindDirect}</td>
                        </tr>
                        <tr>
                            <td>Облачность: </td>
                            <td>{clouds} %</td>
                        </tr>
                        <tr>
                            <td>Видимость: </td>
                            <td>{newVis} км</td>
                        </tr>
                        <tr>
                            <td>UV индекс: </td>
                            <td>{uvi}</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
        </>
    );
};

const Forecast = ({ forecast }) => {
    const { timezone_offset, daily } = forecast;

    return (
        <Grid container>
            {daily.map((item, i) => {
                const {
                    temp: { day, night },
                    humidity,
                    pressure,
                    clouds,
                    rain,
                    uvi,
                    wind_speed,
                    wind_deg,
                    dt,
                    weather,
                } = item;

                const newPressure = Math.round(pressure / 1.333),
                    dayTemp = Math.round(day - 273),
                    nightTemp = Math.round(night - 273),
                    newWindSpeed = Math.round(wind_speed),
                    newWindDirect = WindDirect(wind_deg),
                    forecastDay = moment
                        .unix(dt)
                        .utc()
                        .add(timezone_offset, "seconds")
                        .format("dddd DD MMMM"),
                    descr = weather[0]["description"],
                    icon = weather[0]["icon"];

                return (
                    <Grid item xs={12} md={6} xl={3}>
                        <table
                            key={i}
                            className="table"
                            style={{ "background-color": "gainsboro" }}
                        >
                            <tr>
                                <td colspan="2" style={{ textAlign: "center" }}>
                                    Прогноз погоды
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style={{ textAlign: "center" }}>
                                    {forecastDay}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style={{ textAlign: "center" }}>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                                        alt={icon}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style={{ textAlign: "center" }}>
                                    {descr}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style={{ height: "20px" }}></td>
                            </tr>
                            <tr>
                                <td>Днём: </td>
                                <td>{dayTemp} °С</td>
                            </tr>
                            <tr>
                                <td>Ночью: </td>
                                <td>{nightTemp} °С</td>
                            </tr>
                            <tr>
                                <td>Влажность: </td>
                                <td>{humidity} %</td>
                            </tr>
                            <tr>
                                <td>Давление: </td>
                                <td>{newPressure} мм рт ст</td>
                            </tr>
                            <tr>
                                <td>Облачность: </td>
                                <td>{clouds} %</td>
                            </tr>
                            <tr>
                                <td>Осадки: </td>
                                <td>{rain} мм</td>
                            </tr>
                            <tr>
                                <td>Скорость ветра: </td>
                                <td>{newWindSpeed} м/с</td>
                            </tr>
                            <tr>
                                <td>Ветер: </td>
                                <td>{newWindDirect}</td>
                            </tr>
                            <tr>
                                <td>UV индекс: </td>
                                <td>{uvi}</td>
                            </tr>
                        </table>
                    </Grid>
                );
            })}
        </Grid>
    );
};

const WindDirect = (degree) => {
    if (degree > 22.5 && degree < 67.5) return "северо-восточный";
    else if (degree > 67.5 && degree < 112.5) return "восточный";
    else if (degree > 112.5 && degree < 157.5) return "юго-восточный";
    else if (degree > 157.5 && degree < 202.5) return "южный";
    else if (degree > 202.5 && degree < 247.5) return "юго-западный";
    else if (degree > 247.5 && degree < 292.5) return "западный";
    else if (degree > 292.5 && degree < 337.5) return "северо-западный";
    else return "северный";
};

export default CurrentWeather;
