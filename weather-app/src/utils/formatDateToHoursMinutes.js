export const formatDateToHoursMinutes = (date) => {
    const hoursMinutesSeconds = date.toTimeString().split("  ")[0];
    const hoursMinutesArray = hoursMinutesSeconds.split(":");                   // on va enlever les secondes 
    const hoursMinutes = hoursMinutesArray[0] + ":" + hoursMinutesArray [1] ;  //ici on recupere les 2 valeurs (heure et minutes)
    return hoursMinutes;  // c est une chaine de caractere au format hh: mm
};