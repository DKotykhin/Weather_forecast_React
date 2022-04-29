export const windDirect = (degree) => {
  if (degree > 22.5 && degree < 67.5) return "северо-восточный";
  else if (degree > 67.5 && degree < 112.5) return "восточный";
  else if (degree > 112.5 && degree < 157.5) return "юго-восточный";
  else if (degree > 157.5 && degree < 202.5) return "южный";
  else if (degree > 202.5 && degree < 247.5) return "юго-западный";
  else if (degree > 247.5 && degree < 292.5) return "западный";
  else if (degree > 292.5 && degree < 337.5) return "северо-западный";
  else return "северный";
};
