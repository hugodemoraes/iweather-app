import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {isAfter, addMinutes, format, fromUnixTime} from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import api from '../services/api';
import watherTypes from '../enums/weatherTypes.enum';

interface WeatherState {
  weather: {
    id: number;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastState {
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }[];
}

interface WeatherData {
  city: string;
  temperature: number;
  icon: string;
  wind: number;
  humidity: number;
  forecast: Forecast[] | undefined;
  checked: Date;
}

interface Forecast {
  date: string;
  min: number;
  max: number;
}

interface GeneralContextData {
  loading: boolean;
  getWeatherData(): Promise<void>;
  weatherData?: WeatherData;
}

interface ILocation {
  latitude: string;
  longitude: string;
}

const GeneralContext = createContext<GeneralContextData>(
  {} as GeneralContextData,
);

export const GeneralProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined,
  );

  const getIcon = (id: number) => {
    if (id === 800) {
      return watherTypes.find(({code}) => code === id)?.name || '';
    }

    const prefixId = String(id).substr(0, 1);
    return watherTypes.find(({code}) => String(code) === prefixId)?.name || '';
  };

  const getForecast = useCallback(async (currentLocation) => {
    const {data} = await api.get<ForecastState>('/onecall', {
      params: {
        lat: currentLocation.latitude,
        lon: currentLocation.longitude,
        units: 'metric',
        appid: '36512b9133c9cbcfda2be559de97ee27',
        exclude: 'hourly,minutely',
      },
    });

    return data.daily.slice(1, 4).map((day) => {
      return {
        date: format(fromUnixTime(day.dt), 'ccc', {
          locale: ptBr,
        }),
        min: Math.round(day.temp.min),
        max: Math.round(day.temp.max),
      };
    });
  }, []);

  const getWeatherData = useCallback(async () => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      async (position) => {
        const {latitude, longitude} = position.coords;
        const currentLocation = {
          latitude: String(latitude),
          longitude: String(longitude),
        };

        const {data: weather} = await api.get<WeatherState>('/weather', {
          params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            appid: '36512b9133c9cbcfda2be559de97ee27',
          },
        });
        const forecast = await getForecast(currentLocation);

        setWeatherData({
          city: weather.name,
          temperature: Math.round(weather.main.temp),
          icon: getIcon(weather.weather[0].id),
          humidity: Math.round(weather.main.humidity),
          wind: Math.round(weather.wind.speed),
          forecast,
          checked: new Date(),
        });
      },
      (error) => {
        Alert.alert('GPS is necessary to get your weather data.');
        console.log(`${error.code} => ${error.message}`);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    setLoading(false);
  }, [getForecast]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
    }

    if (
      !weatherData ||
      isAfter(new Date(), addMinutes(weatherData.checked, 30))
    ) {
      getWeatherData();
    }
  }, [weatherData, getWeatherData]);

  return (
    <GeneralContext.Provider value={{getWeatherData, loading, weatherData}}>
      {children}
    </GeneralContext.Provider>
  );
};

export function useGeneral(): GeneralContextData {
  const context = useContext(GeneralContext);

  if (!context) {
    throw new Error('useGeneral must be used within an GeneralProvider');
  }

  return context;
}
