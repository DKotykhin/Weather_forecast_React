import { Grid } from "@mui/material";

import { getWeatherData, getWeatherParams } from "./data";

const CurrentView = ({ currentdata }) => {
  const [{ current }, lastupd, cityName, localData, localTime] = currentdata;

  const { humidity, clouds, uvi } = current;
  const { descr, icon } = getWeatherData(current.weather);
  const {
    newPressure,
    newTemp,
    newFeels,
    newDewPoint,
    newWindSpeed,
    newWindDirect,
    newVis,
    newSunrise,
    newSunset,
    dayDuration,
  } = getWeatherParams(current);

  const currentItem_1 = [
    { name: "Местное время: ", value: localTime },
    { name: "Рассвет: ", value: newSunrise },
    { name: "Закат: ", value: newSunset },
    { name: "Длительность дня: ", value: dayDuration },
  ];

  const currentItem_2 = [
    { name: "Температура: ", value: newTemp + " °С" },
    { name: "Чувствуется как: ", value: newFeels + " °С" },
    { name: "Влажность: ", value: humidity + " %" },
    { name: "Давление: ", value: newPressure + " мм рт ст" },
    { name: "Точка росы: ", value: newDewPoint + " °С" },
  ];

  const currentItem_3 = [
    {
      name: "Скорость ветра: ",
      value: newWindSpeed ? newWindSpeed + " м/с" : "безветренно",
    },
    { name: "Ветер: ", value: newWindDirect },
    { name: "Облачность: ", value: clouds ? clouds + " %" : "ясно" },
    { name: "Видимость: ", value: newVis + " км" },
    { name: "UV индекс: ", value: uvi ? uvi.toFixed(1) : uvi },
  ];

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
            {currentItem_1.map((item, i) => {
              return (
                <tr>
                  <td key={i}>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              );
            })}
          </table>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <table className="table">
            {currentItem_2.map((item, i) => {
              return (
                <tr>
                  <td key={i}>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              );
            })}
          </table>
        </Grid>
        <Grid item xs={12} md={6} xl={3}>
          <table className="table">
            {currentItem_3.map((item, i) => {
              return (
                <tr>
                  <td key={i}>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              );
            })}
          </table>
        </Grid>
      </Grid>
    </>
  );
};

export default CurrentView;
