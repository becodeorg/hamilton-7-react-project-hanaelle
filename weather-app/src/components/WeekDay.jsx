import React, { useEffect } from 'react'
import { useState } from 'react'
import { getEmojis } from '../utils/getEmojis';

const WeekDay = ({data, weatherUnits}) => {
    const [weatherEmojis, setWeatherEmojis] = useState ("");
    const [averageTemperature, setAverageTemperature] = useState (0);

    console.log(data);

    useEffect(() => {
        if(!data) return;

    const avTemp = (
        (data.temperature_2m_max + data.temperature_2m_min) / 
        2
        ).toFixed (1);                                      //calcul de la temperature moyenne,toFixed (1) donne 1 chiffre apres le virgule 

    const weatherEmojis = getEmojis(
    avTemp, 
    data.precipitation_sum, 
    data.windspeed_10_max            //recupere les emogies de la meteo
    );


},[]);


return <div>WeekDay</div>
};

export default WeekDay