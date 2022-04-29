import { useState, useCallback } from "react";
import GetData from "../../api/getData/GetData";

export const useFetchWeather = () => {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { getCityCoordinates, getCityWeather, getCityPollution } = GetData();

  const getWeather = useCallback(
    async (cityId) => {
      try {
        setLoading(true);
        setLoaded(false);

        const coords = await getCityCoordinates(cityId);
        const { lat, lon } = coords;

        const [weatherData, pollutionData] = await Promise.all([
          getCityWeather(lat, lon),
          getCityPollution(lat, lon),
        ]);

        setLoading(false);
        setLoaded(true);

        return { weatherData, pollutionData };
      } catch {
        setLoading(false);
        setError(true);
        setLoaded(false);

        console.log("error");

        return null;
      }
    },
    [getCityPollution, getCityWeather, getCityCoordinates]
  );

  return { loading, loaded, error, getWeather };
};
