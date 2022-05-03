const zeroKelvin = 273;

export const tempCelsius = (temperature) => {
    return Math.round(temperature - zeroKelvin);
}