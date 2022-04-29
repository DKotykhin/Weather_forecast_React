import weather_image from "./weather.png";

import "./AppHeader.css";
import { Container } from "@mui/material";

const Header = () => {
    return (
        <Container className="header">
            <div className="line">
                <img src={weather_image} alt={"weather"} /> Weather Forecast
            </div>
        </Container>
    );
};

export default Header;
