import { useState, useEffect } from "react";
import { fetchCities } from "../../services/api/cities";
import { currentForecast } from "../../services/api/current-forecast";
import { fetchForecast } from "../../services/api/forecast";
import { cityDetails } from "../../models/weather-state";
import { cities } from "../../models/cities";
import { CurrentWeatherDetails } from "../current-weather-details/CurrentWeatherDetails";
import { ForeCastDetails } from "../forecast-details/ForeCastDetails";
import { LoadingOutlined } from "@ant-design/icons";
import { groupBy } from "lodash";
import { WEATHER_FORECAST } from "../../constants/constants";
import "./WeatherForecasts.css";

export const WeatherForecasts = () => {
  const [citiesList, setCitiesList] = useState<cities[]>([]);
  const [cityDetails, setCityDetails] = useState<cityDetails>({
    selectedCity: "",
    currentWeather: {},
    forecast: [],
    loading: false,
  });

  useEffect(() => {
    (async () => {
      const data: cities[] = await fetchCities();
      setCitiesList((prev) => data);
      setCityDetails((prev) => ({
        ...prev,
        selectedCity: `${data?.[0]?.nm}_${data?.[0]?.lat}_${data?.[0]?.lon}`,
      }));
    })();
  }, []);

  const fetchCitiesList = async (keyArr: string[]) => {
    setCityDetails((prev) => ({
      ...prev,
      loading: true,
    }));
    const data = await currentForecast(keyArr?.[1], keyArr?.[2]);
    setCityDetails((prev) => ({
      ...prev,
      currentWeather: data,
      loading: false,
    }));
  };

  const fetchWeatherDetails = async (keyArr: string[]) => {
    setCityDetails((prev) => ({
      ...prev,
      loading: true,
    }));
    const data: any = await fetchForecast(keyArr?.[1], keyArr?.[2]);
    const gropedData: any = groupBy(data?.list, (ele) =>
      new Date(ele?.dt_txt).getDate()
    );
    delete gropedData?.[new Date().getDate()];
    setCityDetails((prev) => ({
      ...prev,
      forecast: gropedData,
      loading: false,
    }));
  };

  useEffect(() => {
    if (cityDetails?.selectedCity) {
      const keyArr = cityDetails?.selectedCity?.split("_");
      (async () => {
        await fetchCitiesList(keyArr);
      })();
      (async () => {
        await fetchWeatherDetails(keyArr);
      })();
    }
  }, [cityDetails?.selectedCity]);

  const selectHandler = (event: any) => {
    setCityDetails((prev: any) => ({
      ...prev,
      selectedCity: event?.target?.value,
    }));
  };

  return (
    <div className="whether-page">
      <div className="header">
        <h1>{WEATHER_FORECAST}</h1>
      </div>
      <div className="whether-container">
        <div className="filter-container">
          <select className="weather" onChange={selectHandler}>
            {citiesList?.map((item) => (
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
              currentWeather={cityDetails?.currentWeather}
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
