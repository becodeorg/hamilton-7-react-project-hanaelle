import React, {useEffect, useState, useCallback} from "react";
//import reactLogo from './assets/react.svg'
//import './App.css'
import Today from "./components/Today";
import WeekDay from "./components/WeekDay";
import {formatWeatherDataDaily} from "./utils/formatWeatherDataDaily";

function App() {
    const [isLoading, setIsLoading] = useState(false); //  se voit attribuer une valeur mais n'est jamais utilisé.
    const [error, setError] = useState(false); //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.
    const [geoLoc, setGeoLoc] = useState({latitude: 0, longitude: 0}); //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.
    const [weatherUnits, setWeatherUnits] = useState({});
    const [weatherData, setWeatherData] = useState([]);

    const fetchWeather = useCallback(async (url) => {
        //usecallback permet d optimiser cette fonction et de la memorise avec les parametres sans devoir la recréer
        setError(false);

        try {
            // try catch permet de capter les erreurs quand on fait du fetch
            const res = await fetch(url); //res => response => promesse
            const data = await res.json();

            console.log(data);
            if (Object.keys(data).length === 0) {
                //Objet permet de verifier si dans data il y une données, ex clés , les champs de data
                setError(true);
                console.log("erreur 1");
            } else {
                // recupere les donnees jour par jour mais on va les formater
                const formattedDailyData = formatWeatherDataDaily(data.daily);
                setWeatherData(formattedDailyData);
                // recupere les unites (leve du soleil couche du soeil etc..on recupere ses donnees sur le site .)
                setWeatherUnits({
                    rain: data.daily_units.precipitation_sum,
                    temperature: data.daily_units.temperature_2m_max,
                    wind: data.daily_units.windspeed_10m_max,
                });
            }
        } catch (error) {}
    }, []);
    useEffect(() => {
        setIsLoading(true);

        if (!navigator.geolocation) {
            //pour verifier si le navigateur est compatible (! navigateur. geo ...) veut dire s il n exite pas ce sera pas possible del utiliser
            window.alert(
                "votre navigation ne permet pas la géolocalisation pour utiliser cette application", //infome l utilisateur qu on peut pas lui donner cet indo
            );
        }
        getGeoLocalisation(); // ici on va recupere les donnes gps
        fetchWeather(
            `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon`,
        ).then(() => setIsLoading(false));
    }, [fetchWeather, geoLoc.latitude, geoLoc.longitude]);

    const getGeoLocalisation = () => {
        //chercher les donnees gps
        navigator.geolocation.getCurrentPosition(
            //cette fonction reponds en cas de succes
            (position) => {
                setGeoLoc({
                    //si on réussi a avoir l info on aura acces a la lattitude et la longitude.ici (position.coords.latitude)le coords se trouve sur le site des coordonne
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setError(true); // en cas d erreur faire ce call back
            },
        );
    };
    //si c est en chargement
    if (isLoading) {
        return (
            <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20">
                <p className="text-center">Chargement ...</p>
            </div>
        );
    }

    //si il y a une erreur de chargement
    if (error) {
        return (
            <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20">
                <p className="text-center text-red-500">
                    Une erreur est survenue lors de la récuperation des
                    previsions météo ...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen h-max bg-cyan-600 flex justify-center items-start p-8 md:px-20">
            <div className="w-full max-w-7xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-4 md:px-12 md:py-8 xl:py-12 xl:px-28">
                <Today data={weatherData[0]} weatherUnits={weatherUnits} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
                    {" "}
                    {/* // aligner les donnees en grid et repsonsive 1colonne avec
                    espace de 6 carrés */}
                    {weatherData &&
                        weatherData
                            .slice(1, weatherData.length)
                            .map((data, index) => (
                                <WeekDay
                                    key={index}
                                    data={data}
                                    weatherUnits={weatherUnits}
                                />
                            ))}{" "}
                    {/* map sur les jours suivant => daily*/}
                </div>
            </div>
            ;
        </div>
    );
}
export default App;
