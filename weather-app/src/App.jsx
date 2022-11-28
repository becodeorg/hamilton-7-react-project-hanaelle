import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
import './App.css'
import { formatWeatherDataDaily } from './utils/formatWeatherDataDaily'

function App() {
    const[isloading, setIsLoading] = useState(false);                       //  se voit attribuer une valeur mais n'est jamais utilisé.
    const[error, setError] = useState(false);                              //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.
    const[geoLoc, setGeoLoc] = useState({latitude:  0, longitude: 0});     //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.
    const[weatherUnits, setWeatherUnits] = useState({});
    const [weatherData, setWeatherData] = useState([]);
    useEffect (() => {
        setIsLoading(true);

        if(!navigator.geolocation) {                                         //pour veridier si le navigateur est compatible (! navigateur. geo ...) veut dire s il n exite pas ce sera pas possible del utiliser 
            window.alert(
            "votre naguation ne permet pas la géolocalisation pour utiliser cette application"//infome l utilisateur qu on peut pas lui donner cet indo
            );
        }
    getGeoLocalisation();                                                 // ici on va recupere les donnes gps

    fetchWeather(
        ´https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon´
);

    }, []);

    const getGeoLocalisation = () => {                                       //chercher les donnees gps
        navigator.geolocation.getCurrentPosition(                            //cette fonction reponds en cas ed succes 
            (position) => {
                setGeoLoc({                                                 //si on reussi a avoir l info on aura acces a la lattitude et la longitude.ici (position.coords.latitude)le coords se trouve sur le site des coordonne 
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude,
                }); 
            },
            () => {
                setError(true);                                                 // en cas d erreur faire ce call back 
            }
        );  
    };

    const fetchWeather = useCallback(async (url) => {
        setError(false);

        try {
            const res = await fetch (url);                                  //res => response => promesse
            const data = res.json();

            
            
            console.log(data);
            if (Object.keys(data).length === 0) {
                setError(true);
            } else {                        // recupere les donnees jour par jour mais on va les formater
                const formattedDailyData = formatWeatherDataDaily(data.daily);    
                setWeatherData(formattedDailyData);
                    // recupere les unites (leve du soleil couche du soeil etc..on recupere ses donnees sur le site .)
                
                
                
                    setWeatherUnits({
                    rain: data.daily_units.precipitation_sum,
                    temperature: data.daily_units.temperature_2m_max,
                    wind: data.daily_units.windspeed_10m_max,
                });
            }    
        }catch (error) {}
},[]);


  return <div className='App'>METEO</div>;
  
}
export default App
