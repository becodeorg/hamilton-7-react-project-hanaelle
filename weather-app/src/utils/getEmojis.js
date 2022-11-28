import { emojis } from "./emojis";

export const getEmojis = (temperature, precipitation, windspeed) => {
    let weather = "";

    if(temperature <= 0) {    // SI la temp est infereiru ou egal a 0
        weather += emojis.cold
    } else if (temperature >= 25) {
        weather += emojis.hot;
    }

    if (precipitation === 0) {
        weather += emojis.sum;
    } else if (precipitation >= 3) {
        weather += emojis.rain;
    } else{
        weather += emojis.cloud;
    }

    if (windspeed >= 25) {
        weather += emojis.wind;
        }
    return weather;


};