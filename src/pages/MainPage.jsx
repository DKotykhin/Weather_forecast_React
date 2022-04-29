import React from "react";

import AppHeader from "../Components/appHeader/AppHeader";
import InputSelect from "../Components/inputSelect/InputSelect";
import CurrentWeather from "../Components/currentWeather/currentWeather";

const MainPage = () => {
  const [city, setCity] = React.useState();
  const [flag, setFlag] = React.useState();

  const onUpdate = (city) => {
    setCity(city);
    console.log("app: " + city);
  };

  const onFlag = (flag) => {
    setFlag(flag);
    console.log("app: " + flag);
  };
  return (
    <div>
      <AppHeader />
      <InputSelect onCityUpdate={onUpdate} onCityFlag={onFlag} />
      <CurrentWeather cityId={city} flagId={flag} />
    </div>
  );
};

export default MainPage;
