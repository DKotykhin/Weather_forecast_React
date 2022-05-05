import React from "react";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { Select } from "@mui/material";
//import { Button, Stack } from "@mui/material";
import cityList from './cityList.json'

import "./InputSelect.css";

const InputSelect = (props) => {
    const [city, setCity] = React.useState('');    

    const onCitySelect = (event) => {        
        setCity(event.target.value);
        props.citySelect(event.target.value);        
    };
      
    return (
        <div className="boxSelector">
            <FormControl color="success" style={{ width: 300 }}>
                <InputLabel id="townLabel">Выберите город</InputLabel>
                <Select
                    variant="standard"
                    labelId="townLabel"
                    //id="townSelect"
                    value={city}
                    label="Выберите город"
                    onChange={onCitySelect}
                    onClick={props.cityUpdate}
                >
                    {cityList.cities.map((item, i) => {
                        return (
                            <MenuItem key={i} value={item}>
                                {item}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
            {/* <Stack className="button">
        <Button color="success" variant="outlined" onClick={ButtonChange}>
          Refresh
        </Button>
      </Stack> */}
        </div>
    );
};

export default InputSelect;
