import { useState, useCallback } from "react";
import { getCityCoordinates, getCityWeather, getCityPollution } from "../../api/getData/GetData";

export const useFetchWeather = () => {
    const [process, setProcess] = useState('waiting');

    const getWeather = useCallback(
        async(cityName) => {
            try {
                setProcess('loading')

                const coords = await getCityCoordinates(cityName);
                const { lat, lon } = coords;

                const [weatherData, pollutionData] = await Promise.all([
                    getCityWeather(lat, lon),
                    getCityPollution(lat, lon),
                ]);

                setProcess('loaded')
                return { weatherData, pollutionData };
            } catch {
                setProcess('error')
                console.log("error");
                return null;
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [getCityPollution, getCityWeather, getCityCoordinates]
    );

    return { process, getWeather };
};