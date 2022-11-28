// ici j exporte le tableau qui correspont au jour de la semaien avec chaque unite (temp, degres, vent etc...)
//         ici ca correspondt au taleau des jours de la semaine avec toutes les donnes du lundi eu dimanche
//     [ 
//         {
//             ici ca correspont  au donnees du lundi par ex
//             precip: 5,
//             sunset:"5:30"
//             ...
//         },
//          ici les donnes du mardi 
//          {
//             precip: 5,
//             sunset:"5:30"
//             ...
//         },
//     ]
// 

export const formatWeatherDataDaily = (data) => {
    const dataDaily = []  //tableau vide qui reprend les jours de la semaine

    const dataEntries = Object.keys(data)   //donnes qui represente jour par jour 

}