import { useState, useEffect } from "react";
import { fetchCities } from "../../services/api/cities";
import { currentForecast } from "../../services/api/current-forecast";
import { fetchForecast } from "../../services/api/forecast";
import { weather } from "../../models/weather-state";
import { CITIES } from "../../models/cities";
import { CurrentWeatherDetails } from "../current-weather-details/CurrentWeatherDetails";
import { ForeCastDetails } from "../forecast-details/ForeCastDetails";
import { LoadingOutlined } from "@ant-design/icons";
import { groupBy } from "lodash";
import "./WeatherForecasts.css";

export const WeatherForecasts = () => {
  const [citiesData, setCitiesData] = useState<CITIES[]>([]);
  const [cityDetails, setSelectedCity] = useState<weather>({
    selectedCity: "",
    currentWhether: {},
    forecast: [],
    loading: false,
  });

  useEffect(() => {
    (async () => {
      const data: CITIES[] = await fetchCities();
      setCitiesData((prev) => data);
      setSelectedCity((prev) => ({
        ...prev,
        selectedCity: `${data?.[0]?.nm}_${data?.[0]?.lat}_${data?.[0]?.lon}`,
      }));
    })();
  }, []);

  useEffect(() => {
    if (cityDetails?.selectedCity) {
      const keyArr = cityDetails?.selectedCity?.split("_");
      (async () => {
        setSelectedCity((prev) => ({
          ...prev,
          loading: true,
        }));
        const data = await currentForecast(keyArr?.[1], keyArr?.[2]);
        setSelectedCity((prev) => ({
          ...prev,
          currentWhether: data,
          loading: false,
        }));
      })();
      (async () => {
        setSelectedCity((prev) => ({
          ...prev,
          loading: true,
        }));
        const data: any = await fetchForecast(keyArr?.[1], keyArr?.[2]);
        const gropedData: any = groupBy(data?.list, (ele) =>
          new Date(ele?.dt_txt).getDate()
        );
        delete gropedData?.[new Date().getDate()];
        setSelectedCity((prev) => ({
          ...prev,
          forecast: gropedData,
          loading: false,
        }));
      })();
    }
  }, [cityDetails?.selectedCity]);

  const selectHandler = (event: any) => {
    setSelectedCity((prev) => ({
      ...prev,
      selectedCity: event?.target?.value,
    }));
  };

  return (
    <div className="whether-page">
      <div className="header">
        <h1>Whether Forecast</h1>
      </div>
      <div className="whether-container">
        <div className="filter-container">
          <select className="weather" onChange={selectHandler}>
            {citiesData?.map((item) => (
              <option
                key={`${item?.nm}_${item?.lat}`}
                value={`${item?.nm}_${item?.lat}_${item?.lon}`}
              >
                {item?.nm}
              </option>
            ))}
          </select>
        </div>
        {!cityDetails?.loading ? (
          <>
            <CurrentWeatherDetails
              selectedCity={cityDetails?.selectedCity}
              currentWhether={cityDetails?.currentWhether}
            />
            <ForeCastDetails forecast={cityDetails?.forecast} />
          </>
        ) : (
          <div className="loader">
            <LoadingOutlined />
          </div>
        )}
      </div>
    </div>
  );
};
