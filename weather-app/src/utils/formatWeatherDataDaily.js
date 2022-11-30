export const formatWeatherDataDaily = (data) => {
    // ici j exporte le tableau qui correspont au jour de la semaien avec chaque unite (temp, degres, vent etc...)
    const dataDaily = []; //tableau vide qui reprend les jours de la semaine

    const dataEntries = Object.keys(data); //donnes qui represente jour par jour

    dataEntries.forEach((key, keyIndex) => {
        for (let i = 0; i < data[key].length; i++) {
            //dans cette boucle FOR une passe sur le tableau des jours pour definir chaque valeur
            if (keyIndex === 0) {
                // SI key Index est = 0 c est a dire commencer le 1 err tour du tableau
                dataDaily.push({}); //on rajouter autant de donnee dans notre objet data
            }
            const dayValue = data[key][i]; //on recupere la valeur du jour individuellemtn jour par jour  dans le champs en question
            dataDaily[i][key] = dayValue; // placer la donnee du jour de l objet qui correspont au jour en question
        }
    });
    // dataDaily.forEach((data) => {

    //     const date = newDate(date.time);

    //     const dayIndex = date.getDay(); // renvois un index avc 0 pour dimache 1 lundi etc...6 pour samedi

    //     data.day = frenchDays[dayIndex];
    // });

    
    return dataDaily;
};

const frenchDays = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
];

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
