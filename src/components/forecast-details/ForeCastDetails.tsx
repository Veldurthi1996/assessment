import { ForeCastDetailsProps } from "../../models/forecast-details";
import { kelvinToCelsius } from "../../services/kelvin-to-celsius";
import { DAYS } from "../../constants/constants";

export const ForeCastDetails = (props: ForeCastDetailsProps) => {
  const { forecast } = props;

  const currentDay = new Date().getDay();

  return (
    <div className="forecast">
      <div className="forecast-titles">
        <div className="forecast-day">
          {DAYS[currentDay > 6 ? 0 : currentDay + 1]}
        </div>
        <div className="forecast-day">
          {DAYS[currentDay > 6 ? 1 : currentDay + 2]}
        </div>
        <div className="forecast-day">
          {DAYS[currentDay > 6 ? 2 : currentDay + 3]}
        </div>
      </div>
      <div className="forecast-items">
        {Object.keys(forecast)?.map((key: any) => (
          <div className="forecast-item" key={key}>
            <div className="forecast-img">
              <img
                src={`https://openweathermap.org/img/wn/${forecast?.[key]?.[0]?.weather?.[0]?.icon}@2x.png`}
                alt="weather"
              />
            </div>
            <div className="forecast-temp">
              <div className="temp-1">
                {kelvinToCelsius(forecast?.[key]?.[0]?.main?.temp)}
              </div>
              <div className="temp-2">
                {kelvinToCelsius(forecast?.[key]?.[1]?.main?.temp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
