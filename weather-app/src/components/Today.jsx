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
    data.windspeed_10m_max                                           //recupere les emojies de la meteo
    );
    //recupere les donnees et les manipuler
    
    setWeatherEmojis(weatherEmojis);
},[data]);

if (!data || !weatherUnits){                                    // on verifie  donc SI jamais il n y pas de data et de weatherunits, on lui dira Erreur 
    return( <div className="text-2xl text-center text-red-500"> 
      Aucune donées, Affichage impossible ...
      </div>
      );
    }


  return (
      <div className="max-w-max mx-auto xl:ml-auto ">    {/*responsive avec marges diff pour chaque ecran */}
      <div className="flex mb-20 mt-12 flex-col xl:flex-row">    {/* mettre emojis et texte et donnees d uncote et le reste de l autre sur une colonne  */}
        <div className="flex flex-col">                           {/*aligner les emojis l un en desou de l autre */}
          <div className="text-8xl mb-8 text-center xl:text-right"> {weatherEmojis} </div>
          <div className="text-3xl font-bold text-center text-white mt-auto mb-8 xl:mt-auto xl:mb-0">
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div className="text-xl ml-12 xl:pl-4 xl:border-l-2 xl:border-l-indigo-500">
          <p>
            {emojis.calendar} Jour : {data.day}
          </p>
          <p>
            {emojis.rain} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p>
            {emojis.sunrise} Lever du soleil : {" "} 
            {formatDateToHoursMinutes(new Date (data.sunrise))} 
          </p>
          <p>
            {emojis.sunrise} Coucher du soleil :{" "}
            {formatDateToHoursMinutes(new Date (data.sunset))} 
          </p>
          <p>
            {emojis.hot} Temperature Max : {data.precipitation_2m_max} {" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.hot} Temperature Min : {data.precipitation_2m_min} {" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.wind} Vent : {data.windspeed_10m_max} {" "}
            {weatherUnits.wind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Today
