import { kelvinToCelsius } from "../../services/kelvin-to-celsius";
import { CurrentWeatherDetailsProps } from "../../models/index";

export const CurrentWeatherDetails = (props: CurrentWeatherDetailsProps) => {
  const { selectedCity, currentWeather } = props;
  return (
    <div className="current-details">
      <div className="city-title">{selectedCity.split("_")?.[0]}</div>
      <div className="city-img">
        <img
          src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0]?.icon}@2x.png`}
          alt="weather"
        />
      </div>
      <div className="city-temp">
        {kelvinToCelsius(currentWeather?.main?.temp)}
      </div>
    </div>
  );
};
