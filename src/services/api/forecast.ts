export const fetchForecast = (lat: string, lon: string) => {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a7ee1283fab75ec5269771d37104563f&cnt=24`).then(response => response.json());
}