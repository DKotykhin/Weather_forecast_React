import React from "react";

import AppHeader from "../Components/appHeader/AppHeader";
import InputSelect from "../Components/inputSelect/InputSelect";
import CurrentWeather from "../Components/currentWeather/currentWeather";

const MainPage = () => {
  const [city, setCity] = React.useState();
  const [flag, setFlag] = React.useState(false);

  const onSelect = (cityName) => {
    setCity(cityName);
    //console.log("app: " + city);
  };

  const onUpdate = () => {
    setFlag(!flag);
    //console.log("app: " + flag);
  };
  
  return (
    <div>
      <AppHeader />
      <InputSelect citySelect={onSelect} cityUpdate={onUpdate} />
      <CurrentWeather cityName={city} flag={flag} />
    </div>
  );
};

export default MainPage;
