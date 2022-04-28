import weather_image from "./weather.png";

import "./AppHeader.css";
import { Container } from "@mui/material";

const Header = () => {
    return (
        <Container className="header">           
            <p><img src={weather_image} alt={"weather"}/> Weather Forecast</p>
            <p className="line"/>            
        </Container>
    );
};

export default Header;
