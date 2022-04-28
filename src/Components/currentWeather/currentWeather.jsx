import { useState, useEffect } from "react";
import GetData from "../getData/GetData";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import moment from "moment";
import "moment/locale/ru";
import { Grid } from "@mui/material";

import "./CurrentWeather.css";

const CurrentWeather = ({ cityId, flagId }) => {
    const [loading, setLoading] = useState(false),
        [loaded, setLoaded] = useState(false),
        [error, setError] = useState(false),        
        [cityName, setCityName] = useState(null),
        [localTime, setLocalTime] = useState(null),
        [localData, setLocalData] = useState(null),
        [lastupd, setLastupd] = useState(null),
        [weatherData, setWeatherData] = useState({});

    const { getCityCoordinates, getCityWeather, getCityPollution } = GetData()    
    
    useEffect(() => {
         getCity();                 
         console.log("hooks version");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flagId, cityId]);

    useEffect(() => {        
        const timeOut = setInterval(() => updateTime(), 10000);
        return () => clearInterval(timeOut);
    });

    useEffect(() => {
        updateTime()        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded])

    const updateTime = () => {
        if (loaded) {
            const {
                timezone_offset,
                current: { dt },
            } = weatherData;
            setLocalTime(moment.utc().add(timezone_offset, "seconds").format("LT"));
            setLocalData(moment.utc().add(timezone_offset, "seconds").format("dddd DD MMMM"));
            setLastupd(moment.unix(dt).startOf().fromNow());
        }
    };

    const getCity = () => {              
        if (cityId) {            
            setLoading(true);
            setCityName(cityId);
            setLoaded(false)           
            getCoordinates();            
        }
    };

    const getCoordinates = () => {        
            getCityCoordinates(cityId)
                .then((coords) => {
                    getWeather(coords)
                    getPollution(coords)
                })
                .catch(onError);        
    };

    const getWeather = (coords) => {
        getCityWeather(coords.lat, coords.lon)
            .then(weatherData => {                
                setLoading(false);
                setLoaded(true);                
                setWeatherData(weatherData);
                console.log(weatherData);                
            })
            .catch(onError);
    };

    const getPollution = (coords) => {
        getCityPollution(coords.lat, coords.lon)
            .then(pollutionData => {
                console.log(pollutionData)
            })
            .catch(onError);
    }    

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
                <CurrentView
                    currentdata={[
                        weatherData,
                        lastupd,
                        cityName,
                        localData,
                        localTime,
                    ]}
                />
            ) : null}
            {!(error || loading) && loaded ? (
                <ForecastView forecastdata={weatherData} />
            ) : null}
        </div>
    );
};

const CurrentView = ({ currentdata }) => {
    const [
        { timezone_offset, current },
        lastupd,
        cityName,
        localData,
        localTime,
    ] = currentdata;
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

    const currentItem_1 = [
        { name: 'Местное время: ', value: localTime },
        { name: 'Рассвет: ', value: newSunrise },
        { name: 'Закат: ', value: newSunset },
        { name: 'Длительность дня: ', value: dayDuration },
    ]

    const currentItem_2 = [
        { name: 'Температура: ', value: newTemp + ' °С' },
        { name: 'Чувствуется как: ', value: newFeels + ' °С' },
        { name: 'Влажность: ', value: humidity + ' %' },
        { name: 'Давление: ', value: newPressure + ' мм рт ст' },
        { name: 'Точка росы: ', value: newDewPoint + ' °С' },
    ]

    const currentItem_3 = [
        { name: 'Скорость ветра: ', value: newWindSpeed ? newWindSpeed + ' м/с' : 'безветренно' },
        { name: 'Ветер: ', value: newWindDirect },
        { name: 'Облачность: ', value: clouds ? clouds + ' %' : 'ясно' },
        { name: 'Видимость: ', value: newVis + ' км' },        
        { name: 'UV индекс: ', value: uvi ? uvi.toFixed (1) : uvi },
    ]        

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
                        {
                            currentItem_1.map((item, i) => {
                                return (
                                <tr>
                                    <td key = {i}>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                                )})
                        }
                    </table>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <table className="table">
                    {
                        currentItem_2.map((item, i) => {
                            return (
                            <tr>
                                <td key = {i}>{item.name}</td>
                                <td>{item.value}</td>
                            </tr>
                            )})
                    }                         
                    </table>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                    <table className="table">
                    {
                        currentItem_3.map((item, i) => {
                            return (
                            <tr>
                                <td key = {i}>{item.name}</td>
                                <td>{item.value}</td>
                            </tr>
                            )})
                    }
                    </table>
                </Grid>
            </Grid>
        </>
    );
};

const ForecastView = ({ forecastdata }) => {
    const { timezone_offset, daily } = forecastdata;

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
                    pop,
                    wind_speed,
                    wind_deg,
                    dt,
                    weather,
                } = item;

                const newPressure = Math.round(pressure / 1.333),
                    dayTemp = Math.round(day - 273),
                    nightTemp = Math.round(night - 273),
                    newWindSpeed = Math.round(wind_speed),
                    newPop = Math.round(pop * 100),
                    newWindDirect = WindDirect(wind_deg),
                    forecastDay = moment
                        .unix(dt)
                        .utc()
                        .add(timezone_offset, "seconds")
                        .format("dddd DD MMMM"),
                    descr = weather[0]["description"],
                    icon = weather[0]["icon"];

                const forecastItem = [
                    { name: 'Днём: ', value: dayTemp + ' °С' },
                    { name: 'Ночью: ', value: nightTemp + ' °С' },                    
                    { name: 'Давление: ', value: newPressure + ' мм рт ст' },
                    { name: 'Облачность: ', value: clouds ? clouds + ' %' : 'ясно' },
                    { name: 'Влажность: ', value: humidity + ' %' },
                    { name: 'Осадки: ', value: rain ? rain.toFixed (1) + ' мм' : 0 },
                    { name: 'Вероятность: ', value: newPop + ' %' },
                    { name: 'Скорость ветра: ', value: newWindSpeed ? newWindSpeed + ' м/с' : 'безветренно' },
                    { name: 'Ветер: ', value: newWindDirect },
                    { name: 'UV индекс: ', value: uvi ? uvi.toFixed (1) : uvi },                    
                ]

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
                                <td colspan="2" style={{ height: "10px" }}></td>                                
                            </tr>
                            {/* <tr>
                                <td colspan="2" className="line"/>
                            </tr>                             */}
                            {
                                forecastItem.map((item, i) => {
                                    return (
                                    <tr>
                                        <td key = {i}>{item.name}</td>
                                        <td>{item.value}</td>
                                    </tr>
                                    )})
                            }
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