import { kelvinToCelsius } from "../../services/kelvin-to-celsius";
import { CurrentWeatherDetailsProps } from "../../models/index";

export const CurrentWeatherDetails = (props: CurrentWeatherDetailsProps) => {
  const { selectedCity, currentWhether } = props;
  return (
    <div className="current-details">
      <div className="city-title">{selectedCity.split("_")?.[0]}</div>
      <div className="city-img">
        <img
          src={`https://openweathermap.org/img/wn/${currentWhether?.weather?.[0]?.icon}@2x.png`}
          alt="weather"
        />
      </div>
      <div className="city-temp">
        {kelvinToCelsius(currentWhether?.main?.temp)}
      </div>
    </div>
  );
};
