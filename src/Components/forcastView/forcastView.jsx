import { Grid } from "@mui/material";

import { getForecastParams, getForecastData} from './forecastData';

const ForecastView = ({ forecastdata }) => {
  const { daily } = forecastdata;

  return (
    <Grid container>
      {daily.map((item, i) => {
        const {          
          humidity,          
          clouds,
          rain,
          uvi,        
          weather,
        } = item;

        const {
          newPressure,
          dayTemp,
          nightTemp,
          newWindSpeed,
          newWindDirect,
          newPop,
          forecastDay,
        } = getForecastParams(item, forecastdata);

        // const newPressure = Math.round(pressure / 1.333),
        //   dayTemp = tempCelsius(day),
        //   nightTemp = tempCelsius(night),
        //   newWindSpeed = Math.round(wind_speed),
        //   newPop = Math.round(pop * 100),
        //   newWindDirect = windDirect(wind_deg),
        //   forecastDay = moment
        //     .unix(dt)
        //     .utc()
        //     .add(timezone_offset, "seconds")
        //     .format("dddd DD MMMM");
          // descr = weather[0]["description"],
          // icon = weather[0]["icon"];
          const { descr, icon } = getForecastData(weather);

        const forecastItem = [
          { name: "Днём: ", value: dayTemp + " °С" },
          { name: "Ночью: ", value: nightTemp + " °С" },
          { name: "Давление: ", value: newPressure + " мм рт ст" },
          { name: "Облачность: ", value: clouds ? clouds + " %" : "ясно" },
          { name: "Влажность: ", value: humidity + " %" },
          { name: "Осадки: ", value: rain ? rain.toFixed(1) + " мм" : 0 },
          { name: "Вероятность: ", value: newPop + " %" },
          {
            name: "Скорость ветра: ",
            value: newWindSpeed ? newWindSpeed + " м/с" : "безветренно",
          },
          { name: "Ветер: ", value: newWindDirect },
          { name: "UV индекс: ", value: uvi ? uvi.toFixed(1) : uvi },
        ];

        return (
          <Grid key={i} item xs={12} md={6} xl={3}>
            <table              
              className="table"
              style={{ "backgroundColor": "gainsboro" }}
            >
              <thead>
                <tr>
                  <td colSpan="2">
                    Прогноз погоды
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {forecastDay}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <img
                      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      alt={icon}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {descr}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ height: "10px" }}></td>
                </tr>
                </thead>
                <tbody>
                {forecastItem.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ForecastView;
