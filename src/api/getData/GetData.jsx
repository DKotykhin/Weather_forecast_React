import axios from "axios";

const appKey = "2e5e5a511f687e8d8ad9d60e5486dcc3";
const instance = axios.create({
    baseURL: "https://api.openweathermap.org/",
});

const getCityCoordinates = async (city) => {
    const result = await instance.get("geo/1.0/direct", {
        params: {
            q: city,
            appid: appKey,
        },
    });
    return result.data[0];
};

const getCityWeather = async (latitude, lontitude) => {
    const result = await instance.get("data/2.5/onecall?&lang=ru&", {
        params: {
            lat: latitude,
            lon: lontitude,
            appid: appKey,
        },
    });
    return result.data;
};

const getCityPollution = async (latitude, lontitude) => {
    const result = await instance.get("data/2.5/air_pollution?&lang=ru&", {
        params: {
            lat: latitude,
            lon: lontitude,
            appid: appKey,
        },
    });
    return result.data.list[0];
};

export { getCityCoordinates, getCityWeather, getCityPollution };
