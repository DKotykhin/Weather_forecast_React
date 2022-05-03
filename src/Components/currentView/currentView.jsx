import { Grid } from "@mui/material";

import { getWeatherData, getWeatherParams } from "./currentData";

const CurrentView = ({ currentdata }) => {
  const [ weatherData, lastupd, cityName, localData, localTime] = currentdata;
  const { current } = weatherData
  const { humidity, clouds, uvi } = current;
  const { descr, icon } = getWeatherData(current.weather);
  const {
    newPressure,
    newTemp,
    newFeels,
    newDewPoint,
    newWindSpeed,
    newWindDirect,
    newVisibility,
    newSunrise,
    newSunset,
    dayDuration,
  } = getWeatherParams(weatherData);

  
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
    { name: "Видимость: ", value: newVisibility + " км" },
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
            <thead>
              <tr>
                {/* <td>Сегодня: </td> */}
                <td colSpan="2">
                  {localData}
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItem_1.map((item, i) => {
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
        <Grid item xs={12} md={6} xl={3}>
          <table className="table">
            <tbody>
              {currentItem_2.map((item, i) => {
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
        <Grid item xs={12} md={6} xl={3}>
          <table className="table">
            <tbody>
              {currentItem_3.map((item, i) => {
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
      </Grid>
    </>
  );
};

export default CurrentView;
