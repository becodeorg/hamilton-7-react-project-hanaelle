import React, { useEffect } from 'react'
import { useState } from 'react'
import { getEmojis } from '../utils/getEmojis';

const WeekDay = ({data, weatherUnits}) => {
    const [weatherEmojis, setWeatherEmojis] = useState ("");
    const [averageTemperature, setAverageTemperature] = useState (0);

    console.log(data);

    useEffect(() => {
        if(!data) return;

    const avTemp = (                                            //calcule lamoyenne de temperature
        (data.temperature_2m_max + data.temperature_2m_min) / 
        2
        ).toFixed (1);                                      //calcul de la temperature moyenne,toFixed (1) donne 1 chiffre apres le virgule 

    const weatherEmojis = getEmojis(
    avTemp, 
    data.precipitation_sum, 
    data.windspeed_10_max                                           //recupere les emojies de la meteo
    );
    //recupere les donnees et les manipuler
    setAverageTemperature(avTemp);
    setWeatherEmojis(weatherEmojis);
},[data]);

    if (!data || !weatherUnits){                                    // on verifie  donc SI jamais il n y pas de data et de weatherunits, on lui dira Erreur 
    return <div> Erreur ...</div>;
    }
return <div>
        <p>{data.day}</p>                                                 //les jours en francais
        <p>{averageTemperature}<span> {weatherUnits.temperature}</span></p>          //degres et moyenne des temperature
        <div>
            {weatherEmojis && <div>{weatherEmojis}</div>}                           //afficher les emojis
        </div>
        
        </div>
};

export default WeekDay