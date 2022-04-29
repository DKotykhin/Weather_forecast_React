import { Grid } from "@mui/material";
import moment from "moment";
import { windDirect } from "../../helpers/windDirection";

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
          newWindDirect = windDirect(wind_deg),
          forecastDay = moment
            .unix(dt)
            .utc()
            .add(timezone_offset, "seconds")
            .format("dddd DD MMMM"),
          descr = weather[0]["description"],
          icon = weather[0]["icon"];

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
              <tbody>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    Прогноз погоды
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {forecastDay}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    <img
                      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      alt={icon}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ textAlign: "center" }}>
                    {descr}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" style={{ height: "20px" }}></td>
                </tr>
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