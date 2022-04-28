import React from 'react';

import AppHeader from '../appHeader/AppHeader'
import InputSelect from '../inputSelect/InputSelect';
import CurrentWeather from '../currentWeather/currentWeather';

const MainPage = () => {
    const [city, setCity] = React.useState()
    const [flag, setFlag] = React.useState()
    
    const onUpdate = (city) => {        
      setCity(city)  
      console.log('app: ' + city)      
    }

    const onFlag = (flag) => {
      setFlag(flag);
      console.log('app: ' + flag)
    }
    return (
        <div>
          <AppHeader/>
            <InputSelect 
                onCityUpdate={onUpdate} 
                onCityFlag={onFlag} />
            <CurrentWeather 
                cityId={city} 
                flagId={flag} />
        </div>
    );
};

export default MainPage;
