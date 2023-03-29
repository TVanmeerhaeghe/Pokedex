//Methode formatDate qui affiche la date au format xx/xx/xxxx
//Si pas de valeur retourne la date actuel New Date
const formatDate = (date: Date = new Date()): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default formatDate;
