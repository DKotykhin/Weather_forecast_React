import weather_image from "./weather.png";

import "./AppHeader.css";
import { Container, Box, Paper } from "@mui/material";

const Header = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    "& > :not(style)": {
                        m: 2,
                        width: 1100,
                        height: 100,
                    },
                }}
            >
                <Paper elevation={5}>
                    <div className="header">
                        <img src={weather_image} alt={"weather"} /> Weather
                        Forecast
                    </div>
                </Paper>
            </Box>
        </Container>
    );
};

export default Header;
