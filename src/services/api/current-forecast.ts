export const currentForecast = (lat: string,lon: string) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7ee1283fab75ec5269771d37104563f`).then(response => response.json());
}