import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
    const[isloading, setIsLoading] = useState(false); //  se voit attribuer une valeur mais n'est jamais utilisé.
    const[error, setError] = useState(false);  //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.
    const[geoLoc, setGeoLoc] = useState((latitude:  0, longitude: 0));  //Une valeur est attribuée à l'erreur, mais elle n'est jamais utilisée.

    useEffect (() => {
        setIsLoading(true);

    if(!navigator.geolocation) {//pour veridier si le navigateur est compatible (! navigateur. geo ...) veut dire s il n exite pas ce sera pas possible del utiliser 
        window.alert(
            "votre naguation ne permet pas la géolocalisation pour utiliser cette application"//infome l utilisateur qu on peut pas lui donner cet indo
        );
    }
    getGeoLocalisation(); // ici on va recupere les donnes gps

    fetchWeather("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon"
);

    }, []);

    const getGeoLocalisation = () => {
        navigator.geolocation.getCurrentPosition(  //cette fonction reponds en cas ed succes 
            (position) => {
                setGeoLoc({       //si on reussi a avoir l info on aura acces a la lattitude et la longitude.ici (position.coords.latitude)le coords se trouve sur le site des coordonne 
                    latitude: position.coords.latitude, 
                    longitude: position.coords.longitude,
                }); 
            },
            () => {
                setError(true);  // en cas d erreur faire ce call back 
            }
        );  
    };
const fetchWeather = useCallback(async (url) => {
    setError(false);

    try {
        const res = await fetch (url); //res => response => promesse
        const data = res.json();

        if(object.keys(data).length == 0){
            setError(true);
        } else    
    }catch (error) {}
},[]);


  return (
    <main className='container  space-y-4'>
        <div className='title bg-teal-400'>
          <h1 className='title-h1 pt-0 text-5xl text-white text-center'>Weather App</h1>
        </div>
        <p className='city text-xl bg-red-600 space-y-4'>
            Enter a city
          </p>

          
        
        
        
        
            <input className='input-text flex flex-col space-y-4 bg-slate-400' type="text" />

<button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded">
  Enter
</button>
    </main>
  )
}
export default App
