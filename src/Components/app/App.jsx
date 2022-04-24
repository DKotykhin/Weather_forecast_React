
import InputSelect from '../input/InputSelect';
import CurrentWeather from '../currentWeather/CurrentWeather';

import './App.css';
import React from 'react';

const App = () => {
    const [city, setCity] = React.useState('')
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
          <InputSelect
            onCityUpdate={onUpdate}
            onCityFlag={onFlag}/>
          <CurrentWeather
            cityId={city}
            flagId={flag}/>
        </div>
    );   
}

export default App;