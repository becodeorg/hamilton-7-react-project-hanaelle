import React, {useEffect} from "react";
import {useState} from "react";
import {getEmojis} from "../utils/getEmojis";

const WeekDay = ({data, weatherUnits}) => {
    const [weatherEmojis, setWeatherEmojis] = useState("");
    const [averageTemperature, setAverageTemperature] = useState(0);

    //console.log(data);

    useEffect(() => {
        if (!data) return;

        const avTemp = //calcule la moyenne de temperature
            ((data.temperature_2m_max + data.temperature_2m_min) / 2).toFixed(
                1,
            );
        //  calcul de la temperature moyenne,toFixed (1) donne 1 chiffre apres le virgule

        const weatherEmojis = getEmojis(
            avTemp,
            data.precipitation_sum,
            data.windspeed_10m_max, //recupere les emojies de la meteo
        );
        // recupere les donnees et les manipuler
        setAverageTemperature(avTemp);
        setWeatherEmojis(weatherEmojis);
    }, [data]);

    if (!data || !weatherUnits) {
        //  on verifie  donc SI jamais il n y pas de data et de weatherunits, on lui dira Erreur
        return (
            <div className="text-2xl text-center text-red-500">Erreur ...</div>
        );
    }
    return (
        <div className="text-center p-6 rounded-md bg-white/30 shadow-md flex justify-center items-center md:flex-col ">
            {" "}
            {/* //style: petite carre qui affiche temps, jour et émoji */}
            <p className="text-lg font-bold md:mb-1">{data.time}</p>
            {/*//les jours en francais*/}
            <p className="ml-6 md:mb-4 md:ml-0">
                {averageTemperature}
                <span className="text-xs font-semibold">
                    {" "}
                    {/* //degres et moyenne des temperature */}
                    {weatherUnits.temperature}
                </span>
            </p>
            <div className="ml-6 text-4xl md:ml-0">
                {weatherEmojis && <div>{weatherEmojis}</div>}
                {/* //afficher les emojis */}
            </div>
        </div>
    );
};

export default WeekDay;
