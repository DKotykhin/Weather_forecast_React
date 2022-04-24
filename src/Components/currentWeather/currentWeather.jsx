import { Component } from "react";
import WeatherService from "../getData/GetData";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import moment from "moment";
import "moment/locale/ru";
import { Grid } from "@mui/material";

import "./CurrentWeather.css";

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loaded: false,
            error: false,
            flag: true,
            cityName: null,
            localTime: null,
            localData: null,
            lastupd: null,
            weatherData: {},
        };
    }

    weatherService = new WeatherService();

    componentDidUpdate(prevProps) {
        if (
            this.props.cityId !== prevProps.cityId ||
            this.props.flagId !== prevProps.flagId
        ) {
            this.getCity();
        }
    }

    componentDidMount() {
        this.timeOut = setInterval(this.updateTime, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timeOut);
    }

    updateTime = () => {
        if (this.state.loaded) {
            const {
                timezone_offset,
                current: { dt },
            } = this.state.weatherData;
            this.setState({
                localTime: moment
                    .utc()
                    .add(timezone_offset, "seconds")
                    .format("LT"),
                localData: moment
                    .utc()
                    .add(timezone_offset, "seconds")
                    .format("dddd DD MMMM"),
                lastupd: moment.unix(dt).startOf().fromNow(),
            });
        }
    };

    getCity = () => {
        const { cityId, flagId } = this.props;
        this.setState(
            {
                loading: true,
                cityName: cityId,
                flag: flagId,
            },
            () => this.getCoordinates()
        );
    };

    getCoordinates = () => {
        this.weatherService
            .getCityCoordinates(this.state.cityName)
            .then((coords) => this.getWeather(coords))
            .catch(this.onError);
    };

    getWeather = (coords) => {
        this.weatherService
            .currentWeather(coords.latitude, coords.lontitude)
            .then((weatherData) => {
                console.log(weatherData);
                this.setState(
                    {
                        loading: false,
                        loaded: true,
                        weatherData,
                    },
                    this.updateTime
                );
            })
            .catch(this.onError);
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
        console.log("error");
    };

    render() {
        const { loading, error, loaded } = this.state;

        return (
            <div>
                {error ? <ErrorMessage /> : null}
                {loading ? <Spinner /> : null}
                {!(error || loading) && loaded ? (
                    <View view={this.state} />
                ) : null}
                {!(error || loading) && loaded ? (
                    <Forecast forecast={this.state.weatherData} />
                ) : null}
            </div>
        );
    }
}

const View = ({ view }) => {
    const {
        weatherData: { timezone_offset, current },
        cityName,
        localTime,
        localData,
        lastupd,
    } = view;
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
