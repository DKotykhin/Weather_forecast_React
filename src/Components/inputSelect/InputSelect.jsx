import React from "react";

import { InputLabel, MenuItem, FormControl } from "@mui/material";
import { Select } from "@mui/material";
//import { Button, Stack } from "@mui/material";
import cityList from './cityList.json'

import "./InputSelect.css";

const InputSelect = (props) => {
    const [city, setCity] = React.useState("");
    const [flag, setFlag] = React.useState(false);

    const selectChange = (event) => {
        const city = event.target.value;
        setCity(city);
        props.onCityUpdate(city);
    };

    const clickChange = () => {
        setFlag(!flag);
        props.onCityFlag(flag);
    };

    return (
        <div className="boxSelector">
            <FormControl color="success" style={{ width: 300 }}>
                <InputLabel id="townLabel">Выберите город</InputLabel>
                <Select
                    variant="standard"
                    labelId="townLabel"
                    id="townSelect"
                    value={city}
                    label="Выберите город"
                    onChange={selectChange}
                    onClick={clickChange}
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
