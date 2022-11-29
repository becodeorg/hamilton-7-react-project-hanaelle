import React, { useEffect, useState } from 'react'
import { emojis } from '../utils/emojis';
import { formatDateToHoursMinutes } from '../utils/formatDateToHoursMinutes';
import { getEmojis } from '../utils/getEmojis';

export const Today = ({data, weatherUnits}) => {
      const [weatherEmojis, setWeatherEmojis] = useState ("");
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
    
    setWeatherEmojis(weatherEmojis);
},[data]);

if (!data || !weatherUnits){                                    // on verifie  donc SI jamais il n y pas de data et de weatherunits, on lui dira Erreur 
    return <div> Aucune donées, Affichage impossible ...</div>;
    }


  return (
    <div>
      <div>
        <div>
          <div> {/*  EMOJI */} </div>
          <div>
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div>
          <p>
            {emojis.calendar} Jour : {data.day}
          </p>
          <p>
            {emojis.rain} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p>
            {emojis.sunrise} Lever du soleil : {formatDateToHoursMinutes(data.sunrise)} 
          </p>
        </div>
      </div>
    </div>
  )
};

export default Today
